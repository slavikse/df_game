import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';
import '../shop_time/shop_time';

const $body = document.body;
const $ambient = $body.querySelector('.ambient');
const $shop = $body.querySelector('.shop');
const $store = $shop.querySelector('.store');
const $drumItem = $store.querySelector('.drum-shop');
const $grenadeItem = $store.querySelector('.grenade-shop');
const $firstAidItem = $store.querySelector('.first-aid-shop');
const items = [$drumItem, $grenadeItem]; // хилка уникальна
const itemsLength = items.length;
const $shopClose = $shop.querySelector('.shop-close');
const audioBuyHover = audioSprite.buy_hover;
const audioBuy = audioSprite.buy;
const audioCancel = audioSprite.cancel;
const audioClick = audioSprite.hover_menu;
const audioNextWave = audioSprite.next_wave;
const eventBuyDrum = new Event('buyDrum');
const eventBuyGrenade = new Event('buyGrenade');
const eventBuyFirstAid = new Event('buyFirstAid');
const eventScoreDec = new Event('scoreDec');
const eventWaveStart = new Event('waveStart');

let costsStat = 0;
let score; // деньги $
let firstAid;
let openShopDelayTimerID;

$drumItem.shopDetail = {
  type: 'drum',
  price: 15
};

$grenadeItem.shopDetail = {
  type: 'grenade',
  price: 50
};

$firstAidItem.shopDetail = {
  type: 'first-aid',
  price: 60
};

const firstAidPrice = $firstAidItem.shopDetail.price;

function scoreShop(e) {
  score = e.score;
}

function firstAidShop(e) {
  firstAid = e.firstAid;
}

// показывается уведомление, потом магаз
function openShopDelay() {
  openShopDelayTimerID = setTimeout(openShop, 1600);
}

function openShop() {
  $body.classList.add('dont-shoot');
  $shop.classList.add('shop-open');

  $ambient.setAttribute('src', 'audio/shop_ambient.mp3');
  buyLockUnlock();
}

function buyLockUnlock() {
  for (let i = 0, len = itemsLength; i < len; i++) {
    const item = items[i];
    const price = item.shopDetail.price;

    if (price > score) {
      item.classList.add('buy-block');
    } else {
      item.classList.remove('buy-block');
    }
  }

  canBuyFirstAid();
}

/** максимально аптечек [0-1], т.е. 2 штуки */
function canBuyFirstAid() {
  if (firstAid === 1 || firstAidPrice > score) {
    $firstAidItem.classList.add('buy-block');
  } else {
    $firstAidItem.classList.remove('buy-block');
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

  const type = target.shopDetail.type;
  const price = target.shopDetail.price;

  if (type === 'drum') {
    buyDrum();
  } else if (type === 'grenade') {
    buyGrenade();
  } else if (type === 'first-aid') {
    buyFirstAid();
  } else {
    return;
  }

  buyCompletion(price);
}

function buyDrum() {
  document.dispatchEvent(eventBuyDrum);
}

function buyGrenade() {
  document.dispatchEvent(eventBuyGrenade);
}

function buyFirstAid() {
  firstAid += 1;
  document.dispatchEvent(eventBuyFirstAid);
}

function buyCompletion(price) {
  noise(audioURI, audioBuy);

  eventScoreDec.dec = price;
  document.dispatchEvent(eventScoreDec);

  score -= price;
  saveCostsStat(price);
  buyLockUnlock();
}

function useFirstAid() {
  firstAid -= 1;
  canBuyFirstAid();
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
  clearTimeout(openShopDelayTimerID);
  costsStatistic();
}

document.addEventListener('scoreShop', scoreShop);
document.addEventListener('firstAidShop', firstAidShop);
document.addEventListener('waveEnd', openShopDelay);
document.addEventListener('regeneration', useFirstAid);
$store.addEventListener('mouseover', itemHandler);
$store.addEventListener('click', buy);
$shopClose.addEventListener('mouseover', hoverShopClose);
$shopClose.addEventListener('click', shopClose);
document.addEventListener('gameOver', gameOver);
