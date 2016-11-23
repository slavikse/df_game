const CACHE_NAME = 'v10';
const urlsToCache = [
  './',
  './index.css',
  './index.js',

  './audio/audio_sprite.mp3',
  './audio/dark_ambient.mp3',
  './audio/light_ambient.mp3',
  './audio/shop_ambient.mp3',

  './font/beermoney.woff',
  './font/beermoney.woff2',
  './font/gun_store.woff',
  './font/gun_store.woff2',

  './image/dark.forest.png',
  './image/forest_day.jpg',
  './image/forest_day_mobile.jpg',
  './image/forest_day_tablet.jpg',
  './image/forest_night.jpg',
  './image/forest_night_mobile.jpg',
  './image/forest_night_tablet.jpg',
  './image/sprite.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cacheNames => {
      cacheNames.keys().then(cache => {
        cache.forEach(element => {
          if (urlsToCache.indexOf(element) === -1) {
            caches.delete(element);
          }
        });
      });
    })
  );
});
