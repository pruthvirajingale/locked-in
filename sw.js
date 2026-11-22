const CACHE_NAME = 'locked-in-shell-v6';
const CORE_FILES = [
  new URL('index.html', self.registration.scope).toString(),
  new URL('manifest.webmanifest', self.registration.scope).toString(),
  new URL('icon.svg', self.registration.scope).toString(),
  new URL('icon-192.png', self.registration.scope).toString(),
  new URL('icon-512.png', self.registration.scope).toString()
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => (key.startsWith('calendar-shell-') || key.startsWith('daymark-shell-') || key.startsWith('locked-in-shell-')) && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const fallback = await caches.match(new URL('index.html', self.registration.scope).toString());
        if (fallback) return fallback;
      }
      return new Response('This resource is not available offline.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
