# Offline-First Approach

This document explains how MyJournalApp handles failed requests when the user is offline,
covering the full queue-and-sync pattern used in this project.

---

## What Happens When a Request Fails (Offline)

Your app uses a **queue-and-sync** pattern backed by IndexedDB. Here is the exact flow:

### Step 1 — Request Attempt Fails

The app tries to reach the deployed backend (e.g. `POST /api/journals`).
Since the user is offline, `fetch()` throws a `TypeError: Failed to fetch` (network error).

`journalService.js` catches this specifically:

```js
const isNetworkError = err.name === 'TypeError' || err.message === 'Failed to fetch'
```

If it is a network error → offline fallback runs.
If it is a server error (4xx/5xx) → error is re-thrown normally (not queued).

---

### Step 2 — Action Gets Queued → `addOfflineAction()`

Instead of losing the data, the failed action is serialized and saved to IndexedDB:

```js
// Example: CREATE action queued in journalService.js
const action = {
  action: 'CREATE',          // 'CREATE' | 'UPDATE' | 'DELETE'
  entryId: `temp-${Date.now()}`,
  payload: { title },
  timestamp: new Date().toISOString()
}
await addOfflineAction(action)
```

`addOfflineAction()` in `db.js` opens the `journal-offline-db` IndexedDB database and
writes the action into the `offline-actions` object store with an auto-incremented `id`.

---

### Step 3 — Optimistic UI (User Sees No Interruption)

`createJournal()`, `updateJournal()`, and `deleteJournal()` all return a local object
immediately after queueing, so the UI updates as if the request succeeded:

```js
// createJournal offline fallback return value
return {
  id: tempId,        // e.g. "temp-1718782800000"
  title,
  date: new Date().toISOString().split('T')[0]
}
```

`fetchJournals()` also reads pending offline actions and **merges them on top** of the
server-fetched list so the UI stays consistent even before sync.

---

### Step 4 — Back Online → Sync Triggers

When connectivity is restored, the queued actions need to be replayed against the backend.
Two approaches are used in this project (explained in detail below):

1. **Service Worker Background Sync** — primary, robust
2. **`window.addEventListener('online', ...)`** — fallback, simpler

---

## `db.js` — IndexedDB Queue Functions

| Function | Purpose |
|---|---|
| `openDB()` | Initialize / open the `journal-offline-db` database |
| `addOfflineAction(action)` | Queue a failed request |
| `getOfflineActions()` | Read all queued items in order for replay |
| `deleteOfflineAction(id)` | Remove a successfully synced item |
| `updateOfflineAction(action)` | Update a queued item (e.g. retry count, resolve temp ID) |
| `clearOfflineActions()` | Nuke the entire queue (use with caution) |

All functions return Promises and use `readwrite` / `readonly` transactions appropriately.

---

## Sync Trigger Logic

### Option A — Service Worker Background Sync (Primary)

This is the **robust approach**. It works even if the browser tab is closed when
connectivity is restored.

**How it works:**
1. After queueing an offline action, `registerBackgroundSync()` is called.
2. This registers a sync tag `'sync-journal-actions'` with the Service Worker's `SyncManager`.
3. The browser fires a `sync` event on the Service Worker when the device is back online.
4. The Service Worker handles the event and calls the replay function.

**Registration (already in `journalService.js`):**

```js
const registerBackgroundSync = async () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('sync-journal-actions')
      console.log('[Journal Service] Background sync registered successfully')
    } catch (err) {
      console.error('[Journal Service] Failed to register background sync:', err)
    }
  } else {
    console.log('[Journal Service] Background Sync not supported. Replay will trigger manually.')
  }
}
```

**Service Worker handler (`sw.js` or `service-worker.js`):**

```js
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-journal-actions') {
    event.waitUntil(replayOfflineActions())
  }
})
```

> **Browser support note**: Background Sync API is supported in Chrome/Edge.
> Firefox and Safari do not support it — use Option B as fallback.

---

### Option B — `window.addEventListener('online', ...)` (Fallback)

This is the **simpler approach**. It works while the tab is open and is used as a
fallback when Background Sync is not supported.

```js
// Register once when the app loads (e.g. in main.js or App.jsx)
window.addEventListener('online', async () => {
  console.log('[App] Back online. Attempting to sync offline actions...')
  await replayOfflineActions()
})
```

This fires every time `navigator.onLine` transitions from `false` to `true`.

---

## The Replay / Sync Function

This is the core function that reads the queue and re-fires each request against the backend.
It handles success, failure, and temp ID resolution for CREATE actions.

```js
import {
  getOfflineActions,
  deleteOfflineAction,
  updateOfflineAction
} from '../utils/db'

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/journals`

/**
 * Replays all queued offline actions against the backend in chronological order.
 * - On success: deletes the action from IndexedDB
 * - On network failure: leaves it in the queue for the next sync attempt
 * - On server error: logs and skips (avoids infinite retry on bad data)
 */
export const replayOfflineActions = async () => {
  const actions = await getOfflineActions()

  if (!actions || actions.length === 0) {
    console.log('[Sync] No offline actions to replay.')
    return
  }

  console.log(`[Sync] Replaying ${actions.length} offline action(s)...`)

  for (const action of actions) {
    try {
      let res

      if (action.action === 'CREATE') {
        res = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload),
          credentials: 'include'
        })
      } else if (action.action === 'UPDATE') {
        res = await fetch(`${BASE_URL}/${action.entryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload),
          credentials: 'include'
        })
      } else if (action.action === 'DELETE') {
        res = await fetch(`${BASE_URL}/${action.entryId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
      }

      if (res && res.ok) {
        // Successfully synced — remove from queue
        await deleteOfflineAction(action.id)
        console.log(`[Sync] Action ${action.id} (${action.action}) synced and removed.`)
      } else {
        // Server rejected the request (e.g. 400, 404) — skip to avoid infinite retry
        const errText = res ? await res.text() : 'No response'
        console.error(`[Sync] Server rejected action ${action.id}: ${errText}. Skipping.`)
        await deleteOfflineAction(action.id)
      }

    } catch (err) {
      // Still offline or network error — leave in queue, stop retrying for now
      console.warn(`[Sync] Network error during replay of action ${action.id}. Will retry later.`, err)
      break // Stop processing further actions if we're still offline
    }
  }
}
```

---

## Full Offline Flow Diagram

```
User Action (e.g. Create Journal)
          │
          ▼
  navigator.onLine?
     │          │
    YES         NO
     │          │
     ▼          ▼
  fetch()   addOfflineAction()  ──→  IndexedDB Queue
     │          │
  Success    registerBackgroundSync()
     │
  Return data to UI (optimistic update in both paths)


Later, when back online:
─────────────────────────────────────────
  Browser fires 'sync' event (SW)
  OR window fires 'online' event
          │
          ▼
  replayOfflineActions()
          │
    for each action:
          │
          ▼
      fetch() to backend
          │
       res.ok?
      │       │
     YES      NO (network)
      │       │
      ▼       ▼
  deleteOfflineAction()   break (retry next time)
```

---

## Key Design Decisions

| Decision | Reasoning |
|---|---|
| **Temp IDs (`temp-{timestamp}`)** | Allows UI to render CREATE results before the server assigns a real ID |
| **`break` on network error** | Stops replaying if still offline — avoids pointless iterations |
| **Skip on server error (4xx)** | Bad data should not retry forever — log and discard |
| **Merge offline actions in `fetchJournals()`** | Keeps UI consistent between offline queuing and sync |
| **Background Sync as primary** | Works even when tab is closed; more reliable than `online` event |
| **`online` event as fallback** | Covers browsers that don't support Background Sync (Firefox, Safari) |
