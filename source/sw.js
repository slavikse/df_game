/**
 * кэш инвалидируется в случае изменения файлов,
 * об этом позаботится задача rev,
 * которая сменит имена в у index.css и index.js,
 * тем самым сменит версию кэша (гениально и просто)
 */
const cacheVersion = 'index.css:index.js:audio_sprite.mp3:sprite.png',
  cacheURI = [
    '/',
    '/index.css',
    '/index.js',

    '/audio/audio_sprite.mp3',
    '/audio/dark_ambient.mp3',
    '/audio/intro.mp3',
    '/audio/light_ambient.mp3',

    '/font/beermoney.woff',
    '/font/beermoney.woff2',

    '/image/dark.forest.png',
    '/image/forest_day.jpg',
    '/image/forest_day_mobile.jpg',
    '/image/forest_day_tablet.jpg',
    '/image/forest_night.jpg',
    '/image/forest_night_mobile.jpg',
    '/image/forest_night_tablet.jpg',
    '/image/sprite.png'
  ];

function install(e) {
  e.waitUntil(cached);
}

function cached() {
  caches.open(cacheVersion)
  .then(cache => {
    return cache.addAll(cacheURI);
  })
  .catch(err => {
    console.log(`Ошибка с кэшированием: ${err}`);
  })
}

function fetched(e) {
  e.respondWith(
    caches.match(e.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request);
    })
    .catch(err => {
      console.log(`Ошибка с поиском кэшей: ${err}`);
    })
  );
}

self.addEventListener('install', install);
self.addEventListener('fetch', fetched);
