const CACHE = 'seoyeon-v3';

const ASSETS = [
  '/my-chatbot/',
  '/my-chatbot/index.html',
  '/my-chatbot/manifest.json',
  '/my-chatbot/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => response)
      .catch(() => caches.match('/my-chatbot/index.html'))
  );
});
