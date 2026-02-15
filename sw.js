const CACHE_NAME = 'confessional-v1';
const ASSETS = [
    '/Quiet-Confessions/',
    '/Quiet-Confessions/index.html',
    '/Quiet-Confessions/styles.css',
    '/Quiet-Confessions/app.js',
    '/Quiet-Confessions/data.js',
    '/Quiet-Confessions/manifest.json',
    '/Quiet-Confessions/assets/icon.svg',
    'https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Cinzel:wght@400;600&family=Merriweather:ital,wght@0,300;0,400;1,300&display=swap'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
