export const handleSameOriginRequests = async (event, PRECACHE) => {
  try {
    const sameOriginCachedReponse = await caches.match(event.request); // checks cache for current request
    if (sameOriginCachedReponse) {
      fetchAndUpdateCache(event.request, PRECACHE)
      return sameOriginCachedReponse;
    } else {
      return await fetch(event.request);
    }
  } catch (error) {
    throw error;
  }
}


export const handleCrossOriginRequests = async (event, CORS) => {
  try {
    const crossOriginCachedResponse = await caches.match(event.request); // checks for cache for response
    if (crossOriginCachedResponse && !navigator.onLine) {
      fetchAndUpdateCache(event.request, CORS);
      return crossOriginCachedResponse;
    } else {
      return await fetchAndUpdateCache(event.request, CORS);
    }
  } catch (error) {
    throw error;
  }
}

const fetchAndUpdateCache = async (request, cacheName) => {
  try {
    const actualResponse = await fetch(request); // performs the actual fetch to backend
    if (cacheName && actualResponse.status === 200) {
      const cacheInstance = await caches.open(cacheName);
      await cacheInstance.put(request, actualResponse.clone()); // fills the cloned response to cache
      return actualResponse;
    } else {
      return actualResponse;
    }
  } catch (error) {
    throw error;
  }
}