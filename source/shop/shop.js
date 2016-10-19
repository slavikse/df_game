import noise from './../helper/noise';

const
  $body = document.body,
  $shop = $body.querySelector('.shop'),
  $store = $shop.querySelector('.store'),
  $storeItems = $store.querySelectorAll('.item'),
  $firstAid = $store.querySelector('.first-aid'),
  storeItemsLength = $storeItems.length,
  $score = $body.querySelector('.score'),
  $closeShop = $shop.querySelector('.close-shop'),
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  audioDrumHover = audioSprite.drum_hover,
  audioBuy = audioSprite.buy,
  audioBuyBlock = audioSprite.buy_block,
  audioNextWave = audioSprite.next_wave,
  eventBuyDrum = new Event('buyDrum'),
  eventBuyFirstAid = new Event('buyFirstAid'),
  eventScoreDec = new Event('scoreDec'),
  eventWaveStart = new Event('waveStart');

let
  costs = 0,
  scoreCurrent,
  firstAid;

function openShop() {
  $shop.classList.add('shop-open');
  $shop.style.zIndex = '400';

  $body.classList.add('dont-shoot');
  $score.classList.add('score-shop');

  $store.addEventListener('click', buy);
  $closeShop.addEventListener('mouseup', closeShop);

  /** задержка из за отложенной записи в хранилище... */
  setTimeout(() => {
    scoreCurrent = parseInt(sessionStorage.getItem('score'), 10);
    firstAid = parseInt(sessionStorage.getItem('firstAid'), 10);

    buyLockUnlock();
  }, 20);
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
    noise(audioURI, audioBuyBlock);

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
    addDrum = parseInt(dataset.add, 10),
    scoreDec = parseInt(dataset.score, 10);

  if (item === 'drum') {
    buyDrum(addDrum);
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

function buyDrum(addDrum) {
  eventBuyDrum.add = addDrum;
  document.dispatchEvent(eventBuyDrum);
}

function buyFirstAid() {
  firstAid += 1;
  document.dispatchEvent(eventBuyFirstAid);
}

function closeShop() {
  $closeShop.style.animationName = 'close-shop';

  $store.removeEventListener('click', buy);
  $closeShop.removeEventListener('mouseup', closeShop);

  noise(audioURI, audioNextWave);
  setTimeout(closeShopEnd, 400); // animate
}

function closeShopEnd() {
  $body.classList.remove('dont-shoot');
  $score.classList.remove('score-shop');

  $shop.classList.remove('shop-open');
  $shop.style.zIndex = 'auto';

  $closeShop.style.animationName = '';
  document.dispatchEvent(eventWaveStart);
}

function itemHandler(e) {
  if (!e.target.classList.contains('item')) {
    return;
  }

  noise(audioURI, audioDrumHover);
}

function costsStatistic() {
  let costsEvent = new Event('costs');
  costsEvent.costs = costs;
  document.dispatchEvent(costsEvent);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShop);
  costsStatistic();
}

document.addEventListener('waveEnd', openShop);
$store.addEventListener('mouseover', itemHandler);
document.addEventListener('gameOver', gameOver);
