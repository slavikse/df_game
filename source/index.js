import 'helper/error';
import {shareVK} from 'helper/share';
import 'helper/audios';
import 'preload/preload';
import 'start/start';
import 'notify/notify';
import 'shoot/shoot';
import 'cat/cat';
import 'enemy/enemy';
import 'panel/panel';
import 'shop/shop';
import 'boss/boss';
import 'result/result';
import 'statistic/statistic';
import 'social/social';

/******************************************************
 * игра загрузившись, создает событие,
 * которое слушает стартовый экран,
 * он же запускает игру создавания событие startGame
 ******************************************************/

const $forestNight = document.querySelector('.forest-night');

function startGame() {
  $forestNight.style.opacity = 1;
}

document.addEventListener('startGame', startGame);


//const obj = {
//  uri: 'https://money.yandex.ru/to/410011000753520/100',
//  title: 'Статистика из Темного Леса',
//  desc: 'Подробная статистика по переходу...',
//  image: 'https://vk.com/images/stickers/3097/128.png'
//};

//shareVK({
//  uri: 'https://money.yandex.ru/to/410011000753520/100',
//  title: 'Статистика из Темного Леса',
//  desc: 'Подробная статистика по клику',
//  image: 'https://vk.com/images/stickers/3359/128.png'
//});

//document.onclick = shareVK.bind(this, obj);


//const isProduction = process.env.NODE_ENV === 'production';

//if (isProduction && 'serviceWorker' in navigator) {
//  navigator.serviceWorker.register('sw');
//}
