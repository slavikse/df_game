import './preload/preload';
import './helper/audio_sprite';
import './start_screen/start_screen';
import './shoot/shoot';
import './cat/cat';
import './enemy/enemy';
import './panel/panel';
import './bomb/bomb';
import './shop/shop';
import './result/result';
import './statistic/statistic';

/** загрузив игру, создаст событие, которое слушает стартовый экран */

//window.onerror = (message, url, lineNumber) => {
//  console.log('Отловил:', message, url, lineNumber);
//};

//const NODE_ENV = process.env.NODE_ENV;
//
//if (NODE_ENV === 'production') {
//  if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('sw.js');
//  }
//}
