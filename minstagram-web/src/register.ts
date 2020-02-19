export default function() {
    if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.register('service-worker.js').then((registration) => {
      console.log(registration);
    })
    .catch((error) => {
      console.log(`Error with service worker ${error}`)
    })
  }
}