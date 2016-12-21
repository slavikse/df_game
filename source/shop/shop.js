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
let grenade; // кол-во грен
let firstAid; // кол-во хилок
let openShopDelayTimerID;

$drumItem.shopDetail = {
  type: 'drum',
  price: 15
};

$grenadeItem.shopDetail = {
  type: 'grenade',
  price: 80
};

$firstAidItem.shopDetail = {
  type: 'first-aid',
  price: 100
};

const drumPrice = $drumItem.shopDetail.price;
const grenadePrice = $grenadeItem.shopDetail.price;
const firstAidPrice = $firstAidItem.shopDetail.price;

function scoreShop(e) {
  score = e.score;
}

function grenadeShop(e) {
  grenade = e.grenade;
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
  canBuyDrum();
  canBuyGrenade();
  canBuyFirstAid();
}

function canBuyDrum() {
  if (drumPrice > score) {
    $drumItem.classList.add('buy-block');
  } else {
    $drumItem.classList.remove('buy-block');
  }
}

/** максимально грен [0-1], т.е. 2 штуки */
function canBuyGrenade() {
  if (grenade === 1 || grenadePrice > score) {
    $grenadeItem.classList.add('buy-block');
  } else {
    $grenadeItem.classList.remove('buy-block');
  }
}

/** максимально аптечек [0-1], т.е. 2 штуки */
function canBuyFirstAid() {
  if (firstAid === 1 || firstAidPrice > score) {
    $firstAidItem.classList.add('buy-block');
  } else {
    $firstAidItem.classList.remove('buy-block');
  }
}

function itemBuy(e) {
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
    buyCompletion(price);
  } else if (type === 'grenade') {
    buyGrenade();
    buyCompletion(price);
  } else if (type === 'first-aid') {
    buyFirstAid();
    buyCompletion(price);
  }
}

function buyDrum() {
  document.dispatchEvent(eventBuyDrum);
}

function buyGrenade() {
  grenade += 1;
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
document.addEventListener('grenadeShop', grenadeShop);
document.addEventListener('waveEnd', openShopDelay);
document.addEventListener('regeneration', useFirstAid);
$store.addEventListener('mouseenter', itemHandler);
$store.addEventListener('click', itemBuy);
$shopClose.addEventListener('mouseenter', hoverShopClose);
$shopClose.addEventListener('click', shopClose);
document.addEventListener('gameOver', gameOver);
