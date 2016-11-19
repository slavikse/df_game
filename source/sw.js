//const
//  cacheName = 'v1',
//  cacheFiles = [
//    'index.css',
//    'index.js',
//
//    'audio/audio_sprite.mp3',
//    'audio/dark_ambient.mp3',
//    'audio/light_ambient.mp3',
//    'audio/shop_ambient.mp3',
//
//    'font/beermoney.woff',
//    'font/beermoney.woff2',
//    'font/gun_store.woff',
//    'font/gun_store.woff2',
//
//    'image/dark.forest.png',
//    'image/forest_day.jpg',
//    'image/forest_day_mobile.jpg',
//    'image/forest_day_tablet.jpg',
//    'image/forest_night.jpg',
//    'image/forest_night_mobile.jpg',
//    'image/forest_night_tablet.jpg',
//    'image/sprite.png'
//  ];
//
//function install(e) {
//  // console.info('[sw] Установка sw');
//  e.waitUntil(
//    caches.open(cacheName)
//    .then(cachedFiles)
//    .catch(cachedError)
//  );
//}
//
//function cachedFiles(cache) {
//  // console.info('[sw] Кэширование данных');
//  return cache.addAll(cacheFiles);
//}
//
//function cachedError(error) {
//  console.error(`[sw] Ошибка кэширования: ${error}`);
//}
//
//function activate(e) {
//  // console.info('[sw] Активация sw');
//  e.waitUntil(
//    caches.keys()
//    .then(cacheActual)
//  )
//}
//
//function cacheActual(cacheNames) {
//  return Promise.all(cacheNames.map(outdatedCache));
//}
//
//function outdatedCache(thisCacheName) {
//  if (thisCacheName !== cacheName) {
//    // console.info('[sw] Удаление кэшированных файлов:', thisCacheName);
//    return caches.delete(thisCacheName);
//  }
//}
//
//function fetched(e) {
//  // console.info('[sw] Получение данных', e.request.url);
//  e.respondWith(
//    caches.match(e.request)
//    .then(response => {
//      if (response) {
//        // console.info("[sw] Найдено в кэше: ", e.request.url, response);
//        return response;
//      }
//
//      let requestClone = e.request.clone();
//      fetch(requestClone)
//      .then(response => {
//        if (!response) {
//          // console.info("[sw] Нет ответа из кэша");
//          return response;
//        }
//
//        let responseClone = response.clone();
//
//        caches.open(cacheName)
//        .then(cache => {
//          cache.put(e.request, responseClone);
//          // console.info('[sw] Кэширование новых данных: ', e.request.url);
//
//          return response;
//
//        });
//
//      })
//      .catch(fetchError);
//    })
//
//
//    // caches
//    // .match(e.request)
//    // .then(cachedResponse => {
//    //   if (cachedResponse) {
//    //     return cachedResponse;
//    //   }
//    //
//    //   return fetch(e.request);
//    // })
//    // .catch(fetchError)
//  )
//}
//
//function fetchError(error) {
//  console.error(`[sw] Ошибка получения & кэширования новых данных: ${error}`);
//}
//
//self.addEventListener('install', install);
//self.addEventListener('activate', activate);
//self.addEventListener('fetch', fetched);


// var CACHE_NAME = 'v3';
// var urlsToCache = [
//   './',
//   './index.css',
//   './index.js',
//
//   './audio/audio_sprite.mp3',
//   './audio/dark_ambient.mp3',
//   './audio/light_ambient.mp3',
//   './audio/shop_ambient.mp3',
//
//   './font/beermoney.woff',
//   './font/beermoney.woff2',
//   './font/gun_store.woff',
//   './font/gun_store.woff2',
//
//   './image/dark.forest.png',
//   './image/forest_day.jpg',
//   './image/forest_day_mobile.jpg',
//   './image/forest_day_tablet.jpg',
//   './image/forest_night.jpg',
//   './image/forest_night_mobile.jpg',
//   './image/forest_night_tablet.jpg',
//   './image/sprite.png'
// ];
//
// self.addEventListener('install', function (event) {
//   // Open device cache and store our list of items
//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });
//
// self.addEventListener('fetch', function (event) {
//   // Intercept fetch request
//   event.respondWith(
//     // match and serve cached asset if it exists
//     caches.match(event.request).then(function (response) {
//       return response || fetch(event.request);
//     })
//   );
// });
//
// self.addEventListener('activate', function (event) {
//   event.waitUntil(
//     // Open our apps cache and delete any old cache items
//     caches.open(CACHE_NAME).then(function (cacheNames) {
//       cacheNames.keys().then(function (cache) {
//         cache.forEach(function (element, index, array) {
//           if (urlsToCache.indexOf(element) === -1) {
//             caches.delete(element);
//           }
//         });
//       });
//     })
//   );
// });
