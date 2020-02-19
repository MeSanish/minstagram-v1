const DESTINATION_DOCUMENT = "document";

export const handleSameOriginRequests = async (event, PRECACHE) => {
  try {
    if(event.request.destination === DESTINATION_DOCUMENT) {
      const urlInstance = new URL(event.request.url); // redirects all urls to index for SPA
      const origin = urlInstance.origin;
      const cachedIndex = await caches.match(`${origin}/index.html`);
      return cachedIndex;
    } else {
      const sameOriginCachedReponse = await caches.match(event.request); // checks cache for current request
      if (sameOriginCachedReponse) {
        fetchAndUpdate(event.request, PRECACHE)
        return sameOriginCachedReponse;
      } else {
        return await fetch(event.request)
      }
    }
  } catch (error) {
    throw error;
  }
}


export const handleCrossOriginRequests = async (event, CORS) => {
  try {
    const crossOriginCachedResponse = await caches.match(event.request); // checks for cache for response
    if (crossOriginCachedResponse) {
      fetchAndUpdate(event.request, CORS);
      return crossOriginCachedResponse;
    } else {
      return await fetchAndUpdate(event.request, CORS);
    }
  } catch (error) {
    throw error;
  }
}

const fetchAndUpdate = async (request, cacheName) => {
  try {
    if (navigator.onLine) {
      const actualResponse = await fetch(request); // performs the actual fetch to backend
      if (cacheName && actualResponse.status <= 200) {
        const cacheInstance = await caches.open(cacheName);
        await cacheInstance.put(request, actualResponse.clone()); // fills the cloned response to cache
        return actualResponse;
      } else {
        return actualResponse;
      }
    } else {
      return;
    }
  } catch (error) {
    throw error
  }
}