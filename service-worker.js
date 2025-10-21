// service-worker.js
const CACHE_NAME = 'siti-profile-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/education.html',
  '/skills.html',
  '/contact.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/particles.js'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If fetch fails, show offline page or message
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        
        // For other requests, return a offline placeholder
        return new Response('Koneksi Offline — Mode AI Standby', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});