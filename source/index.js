import './preload/preload.js';
import './helper/audio_sprite.js';
import './start_screen/start_screen.js';
import './shoot/shoot.js';
import './cat/cat.js';
import './enemy/enemy.js';
import './panel/panel.js';
import './bomb/bomb.js';
import './shop/shop.js';
import './result/result.js';
import './statistic/statistic.js';

/** загрузив игру, создаст событие, которое слушает стартовый экран */

window.onerror = error;

function error(message, url, lineNumber) {
  console.error('Ошибочки:', message, url, lineNumber);
}

// const NODE_ENV = process.env.NODE_ENV;
//
// if (NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//   navigator.serviceWorker.register('sw.js');
// }
//
// console.log('[sw] version 23.11.16');
