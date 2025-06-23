// Service Worker utilities
export const forceServiceWorkerUpdate = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    }).then(() => {
      window.location.reload();
    });
  }
};

export const checkForServiceWorkerUpdates = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.update();
    });
  }
};

export const inspectCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    console.log('Available caches:', cacheNames);
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      console.log(`Cache "${cacheName}" contains:`, keys.map(req => req.url));
    }
  }
};

export const clearAllCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    console.log('All caches cleared');
  }
};

// Add to window for debugging
if (typeof window !== 'undefined') {
  window.forceServiceWorkerUpdate = forceServiceWorkerUpdate;
  window.checkForServiceWorkerUpdates = checkForServiceWorkerUpdates;
  window.inspectCaches = inspectCaches;
  window.clearAllCaches = clearAllCaches;
} 