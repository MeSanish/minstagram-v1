 export const handleSameOriginRequests = async (event) => {
  try {
    const sameOriginCachedReponse = await caches.match(event.request); // checks cache for current request
    if (sameOriginCachedReponse) {
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
 }