import './helper/audio_sprite';
import './preload/preload';
import './start_screen/start_screen';
import './shoot/shoot';
import './cat/cat';
import './enemy/enemy';
import './panel/panel';
import './shop/shop';
import './result/result';
import './statistic/statistic';

/** загрузив игру, создаст событие, которое слушает стартовый экран */

window.onerror = (message, url, lineNumber) => {
  console.log(message, url, lineNumber);
};

/******************** SW *********************
 *********** версионность в sw.js ************/

// const NODE_ENV = process.env.NODE_ENV;

// if (NODE_ENV === 'production') {
//   swLoader();
// }

// swLoader();
//
// function swLoader() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//     .register('./sw.js', {scope: './'})
//     .then(registration)
//     .catch(registrationError)
//   }
// }
//
// function registration(e) {
//   if (e.installing) {
//     // console.info('[sw loader] Установка');
//   } else if (e.waiting) {
//     // console.info('[sw loader] Установлен');
//   } else if (e.active) {
//     // console.info('[sw loader] Активен');
//   }
// }
//
// function registrationError(err) {
//   console.error(`[sw] Ошибка регистрации: ${err}`);
// }
