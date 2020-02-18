const PRECACHE = 'precache-v1';
const CORS = 'cors-cache-v1';

const PRECACHE_URLS = [
  'index.html',
  'main.js'
]

/*
  respondWith takes promise as argument
*/

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      console.log('install....')
      const cache = await caches.open(PRECACHE); // opens cache named PRECACHE
      await cache.addAll(PRECACHE_URLS); // adds index and main.js to cache
      return await self.skipWaiting();
    } catch (error) {
      throw error
    }
  })())
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, CORS]; // app cache array
  event.waitUntil((async () => {
    try {
      console.log('activate....')
      const cacheNames = await caches.keys()
      const cachesToDelete = cacheNames.filter(cacheNames => !currentCaches.includes(cacheNames));
      await Promise.all(cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete)))
    } catch (error) {
      throw error;
    }
  })())
});

/*
  respondWith takes promise as argument
*/
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    if (event.request.url.startsWith(self.location.origin)) { // checks for same origin i.e http://localhost:8000 in this case
      event.respondWith((async () => {
        try {
          const sameOriginCachedReponse = await caches.match(event.request); // checks cache for current request
          if (sameOriginCachedReponse && !navigator.onLine) {
            return sameOriginCachedReponse;
          } else {
            return await fetch(event.request);
          }
        } catch (error) {
          throw error;
        }
      })())
    }
    else {
      event.respondWith((async () => {
        try {
          const crossOriginCachedResponse = await caches.match(event.request); // checks for cache for response
          if (crossOriginCachedResponse && !navigator.onLine) {
            return crossOriginCachedResponse;
          } else {
            const corsCache = await caches.open(CORS);
            const actualResponse = await fetch(event.request); // performs the actual fetch to backend
            await corsCache.put(event.request, actualResponse.clone()); // fills the response to cache
            return actualResponse;
          }
        } catch (error) {
          throw error;
        }
      })())
    }
  }
});