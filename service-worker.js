const CACHE_NAME = 'my-cache-v2'; // Update the cache name when changes are made
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/scripts.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(keyList.map((key) => {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }))
        )
    );
});
