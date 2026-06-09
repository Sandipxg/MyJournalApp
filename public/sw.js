const CACHE_NAME = 'journal-cache-v1'

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/screenshots/screenshot-desktop.png',
  '/screenshots/screenshot-mobile.png'
]

// 1. Install Event — Pre-caching Core static shell assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installed')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static assets')
      return cache.addAll(ASSETS_TO_CACHE)
    })
  )
})

// 2. Activate Event — Cleaning up outdated caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activated')
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

// 3. Fetch Event — Intercept requests and apply Caching Strategy
self.addEventListener('fetch', (event) => {
  // We only intercept GET requests for caching to avoid issues with POST/PUT/DELETE
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse // Serve from cache backpack
      }
      return fetch(event.request) // Fetch from market (network)
    })
  )
})
