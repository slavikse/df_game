import './shop_time';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $body = document.body,
  $ambient = $body.querySelector('.ambient'),
  $shop = $body.querySelector('.shop'),
  $store = $shop.querySelector('.store'),
  $storeItems = $store.querySelectorAll('.item'),
  $firstAid = $store.querySelector('.first-aid'),
  storeItemsLength = $storeItems.length,
  $score = $body.querySelector('.score'),
  $closeShop = $shop.querySelector('.close-shop'),

  audioBuyHover = audioSprite.buy_hover,
  audioBuy = audioSprite.buy,
  audioCancel = audioSprite.cancel,
  audioClick = audioSprite.hover_menu,
  audioNextWave = audioSprite.next_wave,

  eventBuyDrum = new Event('buyDrum'),
  eventBuyFirstAid = new Event('buyFirstAid'),
  eventScoreDec = new Event('scoreDec'),
  eventWaveStart = new Event('waveStart');

let
  costs = 0,
  scoreCurrent,
  firstAid;

function openShopDelay() {
  setTimeout(openShop, 1500); // уведомление
}

function openShop() {
  $shop.style.zIndex = '400';
  $body.classList.add('dont-shoot');
  $shop.classList.add('shop-open');
  $score.classList.add('score-shop');

  $ambient.setAttribute('src', 'audio/shop_ambient.mp3');

  $store.addEventListener('click', buy);
  $closeShop.addEventListener('click', closeShop);

  /** задержка из за отложенной записи в хранилище... */
  setTimeout(deferredReading, 40);
}

function deferredReading() {
  scoreCurrent = parseInt(sessionStorage.getItem('score'), 10);
  firstAid = parseInt(sessionStorage.getItem('firstAid'), 10);

  buyLockUnlock();
}

function buyLockUnlock() {
  for (let i = 0, len = storeItemsLength; i < len; i++) {
    const
      item = $storeItems[i],
      itemScore = parseInt(item.dataset.score, 10);

    if (itemScore > scoreCurrent) {
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

  if (!target.classList.contains('item')) {
    return;
  }

  if (target.classList.contains('buy-block')) {
    noise(audioURI, audioCancel);

    /** GOD MOD */

    if (!window.god) {
      return;
    }

    /** / GOD MOD */

    // return;
  }

  const
    dataset = target.dataset,
    item = dataset.item,
    scoreDec = parseInt(dataset.score, 10);

  if (item === 'drum') {
    buyDrum();
  } else if (item === 'first-aid') {
    buyFirstAid();
  } else {
    return;
  }

  noise(audioURI, audioBuy);

  eventScoreDec.dec = scoreDec;
  document.dispatchEvent(eventScoreDec);

  scoreCurrent -= scoreDec;
  costs += scoreDec;
  buyLockUnlock();
}

function buyDrum() {
  document.dispatchEvent(eventBuyDrum);
}

function buyFirstAid() {
  firstAid += 1;
  document.dispatchEvent(eventBuyFirstAid);
}

function hoverCloseShop() {
  noise(audioURI, audioClick);
}

function closeShop() {
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
  $closeShop.style.animationName = 'close-shop-after';

  $store.removeEventListener('click', buy);
  $closeShop.removeEventListener('click', closeShop);

  noise(audioURI, audioNextWave);
  setTimeout(closeShopEnd, 400); // button close shop animate
}

function closeShopEnd() {
  $body.classList.remove('dont-shoot');
  $shop.classList.remove('shop-open');
  $score.classList.remove('score-shop');

  $closeShop.style.animationName = '';
  document.dispatchEvent(eventWaveStart);

  setTimeout(closeShopHide, 400);
}

function closeShopHide() {
  $shop.style.zIndex = '-10';
}

function itemHandler() {
  noise(audioURI, audioBuyHover);
}

function costsStatistic() {
  let costsEvent = new Event('costs');
  costsEvent.costs = costs;
  document.dispatchEvent(costsEvent);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShopDelay);
  costsStatistic();
}

document.addEventListener('waveEnd', openShopDelay);
$store.addEventListener('mouseover', itemHandler);
$closeShop.addEventListener('mouseover', hoverCloseShop);
document.addEventListener('gameOver', gameOver);
