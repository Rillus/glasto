const CACHE_NAME = 'glasto2025-v5';
const FESTIVAL_DATA_CACHE = 'festival-data-v1';
const STATIC_CACHE = 'static-resources-v1';
const IMAGES_CACHE = 'images-v1';

const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/offline.html'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
      caches.open(FESTIVAL_DATA_CACHE),
      caches.open(STATIC_CACHE),
      caches.open(IMAGES_CACHE)
    ])
  );
});

// Fetch event with different strategies for different types of requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Festival data - Cache first, then network (for better offline experience)
  if (url.pathname === '/g2025.json') {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          // Return cached version immediately if available
          if (cachedResponse) {
            // Update cache in background if online
            fetch(request).then(response => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(FESTIVAL_DATA_CACHE).then(cache => {
                  cache.put(request, responseClone);
                });
              }
            }).catch(() => {
              // Silently fail if offline - we already have cached data
            });
            return cachedResponse;
          }
          
          // If no cache, try network
          return fetch(request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(FESTIVAL_DATA_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
    );
    return;
  }

  // Images - Cache first, then network
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(IMAGES_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
    );
    return;
  }

  // Static resources (CSS, JS) - Stale while revalidate
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          const fetchPromise = fetch(request).then(response => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then(cache => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }

  // Navigation requests - For SPAs, all routes should serve the main index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // For SPAs, we want to cache the main index.html for all navigation requests
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              // Cache the response for this specific URL
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached version of this specific route, serve the main index.html
              // This allows React Router to handle the routing on the client side
              return caches.match('/')
                .then(indexResponse => {
                  if (indexResponse) {
                    return indexResponse;
                  }
                  // Only show offline page as absolute last resort
                  return caches.match('/offline.html');
                });
            });
        })
    );
    return;
  }

  // Default - Cache first, then network
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (![CACHE_NAME, FESTIVAL_DATA_CACHE, STATIC_CACHE, IMAGES_CACHE].includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 