// Base path from SW script URL (e.g. /checklist/ when deployed on GitHub Pages)
const BASE = self.location.pathname.replace(/\/[^/]*$/, '') || '';
const INDEX_HTML = BASE + '/index.html';
const CACHE_NAME = 'checklist-cache-v2';
const APP_SHELL = [
  INDEX_HTML,
  BASE + '/manifest.webmanifest?v=1',
  BASE + '/assets/android-chrome-192x192.png',
  BASE + '/assets/android-chrome-512x512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_SHELL).catch(() => {
        // Ignore missing assets (e.g. icons not yet added)
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;
  const url = new URL(request.url);

  // Always prefer the network for navigation requests (HTML), fallback to cached shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(INDEX_HTML, clone));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(INDEX_HTML);
          if (cachedPage) {
            return cachedPage;
          }

          // As a last resort, try the cache for the original request
          return caches.match(request);
        })
    );
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        throw error;
      }
    })
  );
});
