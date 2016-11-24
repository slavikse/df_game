import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';
import '../shop_time/shop_time';

const $body = document.body;
const $ambient = $body.querySelector('.ambient');
const $shop = $body.querySelector('.shop');
const $store = $shop.querySelector('.store');
const $storeItems = $store.querySelectorAll('.item');
const storeItemsLength = $storeItems.length;
const $firstAid = $store.querySelector('.first-aid-shop');
const $shopClose = $shop.querySelector('.shop-close');
const audioBuyHover = audioSprite.buy_hover;
const audioBuy = audioSprite.buy;
const audioCancel = audioSprite.cancel;
const audioClick = audioSprite.hover_menu;
const audioNextWave = audioSprite.next_wave;
const eventBuyDrum = new Event('buyDrum');
const eventBuyFirstAid = new Event('buyFirstAid');
const eventBuyGrenade = new Event('buyGrenade');
const eventScoreDec = new Event('scoreDec');
const eventWaveStart = new Event('waveStart');

let costsStat = 0;
let score;
let firstAid;

function scoreShop(e) {
  score = e.score;
}

function firstAidShop(e) {
  firstAid = e.firstAid;
}

function openShopDelay() {
  setTimeout(openShop, 1500); // уведомление
}

function openShop() {
  $body.classList.add('dont-shoot');
  $shop.classList.add('shop-open');

  $ambient.setAttribute('src', 'audio/shop_ambient.mp3');
  buyLockUnlock();
}

function buyLockUnlock() {
  for (let i = 0, len = storeItemsLength; i < len; i++) {
    const item = $storeItems[i];
    const itemScore = parseInt(item.dataset.score, 10);

    if (itemScore > score) {
      item.classList.add('buy-block');
    } else {
      item.classList.remove('buy-block');
    }
  }

  /** максимально аптечек [0-1], т.е. 2 штуки */
  if (firstAid === 1) {
    $firstAid.classList.add('buy-block');
  }
}

function buy(e) {
  const target = e.target;

  if (target.classList.contains('buy-block')) {
    noise(audioURI, audioCancel);

    /** GOD MOD */

    if (!window.god) {
      return;
    }

    /** / GOD MOD */

    // return;
  }

  const dataset = target.dataset;
  const item = dataset.item;
  const scoreDec = parseInt(dataset.score, 10);

  if (item === 'drum') {
    buyDrum();
  } else if (item === 'first-aid') {
    buyFirstAid();
  } else if (item === 'grenade') {
    buyGrenade();
  } else {
    return;
  }

  noise(audioURI, audioBuy);

  eventScoreDec.dec = scoreDec;
  document.dispatchEvent(eventScoreDec);

  score -= scoreDec;
  saveCostsStat(scoreDec);
  buyLockUnlock();
}

function buyDrum() {
  document.dispatchEvent(eventBuyDrum);
}

function buyFirstAid() {
  firstAid += 1;
  document.dispatchEvent(eventBuyFirstAid);
}

function buyGrenade() {
  document.dispatchEvent(eventBuyGrenade);
}

function hoverShopClose() {
  noise(audioURI, audioClick);
}

function shopClose() {
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
  noise(audioURI, audioNextWave);

  $body.classList.remove('dont-shoot');
  $shop.classList.remove('shop-open');

  document.dispatchEvent(eventWaveStart);
}

function itemHandler() {
  noise(audioURI, audioBuyHover);
}

function saveCostsStat(scoreDec) {
  costsStat += scoreDec;
}

function costsStatistic() {
  const costsEvent = new Event('costs');
  costsEvent.costs = costsStat;
  document.dispatchEvent(costsEvent);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShopDelay);
  costsStatistic();
}

$store.addEventListener('mouseover', itemHandler);
$store.addEventListener('click', buy);
$shopClose.addEventListener('mouseover', hoverShopClose);
$shopClose.addEventListener('click', shopClose);
document.addEventListener('waveEnd', openShopDelay);
document.addEventListener('scoreShop', scoreShop);
document.addEventListener('firstAidShop', firstAidShop);
document.addEventListener('gameOver', gameOver);
