import './preload/preload';
import './helper/audio_sprite';
import './start_screen/start_screen';
import './shoot/shoot';
import './cat/cat';
import './enemy/enemy';
import './panel/panel';
import './shop/shop';
import './result/result';
import './statistic/statistic';

/** загрузив игру, создаст событие, которое слушает стартовый экран */

window.onerror = error;

function error(message, url, lineNumber) {
  console.error('Ошибочки:', message, url, lineNumber);
}

//const NODE_ENV = process.env.NODE_ENV;
//
//if (NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//  navigator.serviceWorker.register('sw');
//}
//
//console.log('[sw v10] version 24.11.16');
