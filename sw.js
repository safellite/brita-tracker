const CACHE_NAME = 'brita-filter-cache-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './apple-touch-icon.png', './icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then((cached) => { const networked = fetch(e.request).then((res) => { if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(e.request, copy)); } return res; }).catch(() => cached); return cached || networked; })); });
