const CACHE_NAME = 'journal-cache-v6' // Incremented to v6 to support API Network-First strategy

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/screenshots/screenshot-desktop.png',
  '/screenshots/screenshot-mobile.png'
]

// 1. Install Event — Pre-caching core stable assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed (v6)')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets')
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
})

// 2. Activate Event — Cleaning up outdated caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated (v6)')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache)
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// 3. Fetch Event — Intercept and route requests based on Caching Strategies
self.addEventListener('fetch', (event) => {
  // Only handle GET requests (avoid caching state-modifying actions like POST/PUT/DELETE)
  if (event.request.method !== 'GET') {
    return
  }

  const url = event.request.url

  // A. Network-First Strategy for Backend API calls (Dynamic Data)
  if (url.includes('/api/journals')) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        // If fetch succeeds, update the cache copy with the latest data
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return networkResponse
      }).catch((err) => {
        console.log('[Service Worker] API network fetch failed, serving cached copy:', err)
        // If offline, serve the last cached list of journal entries
        return caches.match(event.request)
      })
    )
    return
  }

  // B. Cache-First Strategy for Frontend Static Assets (UI shell)
  if (url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse // Return cached file instantly
        }

        return fetch(event.request).then((networkResponse) => {
          // Dynamically cache production JS/CSS assets
          const isAsset = url.includes('/assets/')

          if (networkResponse && networkResponse.status === 200 && isAsset) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return networkResponse
        }).catch((error) => {
          console.log('[Service Worker] Static fetch failed, serving offline page if document:', error)
          // Fallback to offline page for document navigation requests
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html')
          }
        })
      })
    )
  }
})
