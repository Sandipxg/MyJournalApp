const CACHE_NAME = 'journal-cache-v5' // Incremented to v5 to add offline.html fallback

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html', // Pre-cached for offline fallback
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/screenshots/screenshot-desktop.png',
  '/screenshots/screenshot-mobile.png'
]

// 1. Install Event — Pre-caching core stable assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed (v5)')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets')
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
})

// 2. Activate Event — Cleaning up outdated caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated (v5)')
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

// 3. Fetch Event — Cache-First with restricted dynamic caching & offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse // Return cached asset
      }

      return fetch(event.request).then((networkResponse) => {
        // Dynamically cache compiled production JS/CSS assets
        const isAsset = event.request.url.includes('/assets/')

        if (networkResponse && networkResponse.status === 200 && isAsset) {
          const responseToCache = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return networkResponse
      }).catch((error) => {
        console.log('[Service Worker] Fetch failed, serving offline page if html request:', error)
        // Check if the request is an HTML page request
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html')
        }
      })
    })
  )
})
