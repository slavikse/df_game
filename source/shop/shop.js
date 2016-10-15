import noise from './../helper/noise';

//TODO когда фулл аптечек, заблокировать покупку

const
  $body = document.body,
  $shop = $body.querySelector('.shop'),
  $store = $shop.querySelector('.store'),
  $storeItems = $store.querySelectorAll('.item'),
  // $firstAid = $store.querySelector('.first-aid'),
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

let currentScore;

function openShop() {
  /** чтобы счет успел записаться в localStorage */
  setTimeout(setScore, 50);

  $body.classList.add('dont-shoot');
  $shop.style.transform = 'translateY(0)';
  $score.classList.add('score-shop');
  $store.addEventListener('click', buy);
}

function setScore() {
  currentScore = sessionStorage.getItem('score');
  buyLockUnlock();
}

function buyLockUnlock() {
  for (let i = 0, len = storeItemsLength; i < len; i++) {
    const
      item = $storeItems[i],
      itemScore = parseInt(item.dataset.score, 10);

    if (itemScore > currentScore) {
      item.classList.add('buy-block');
    } else {
      item.classList.remove('buy-block');
    }
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
    add = parseInt(dataset.add, 10),
    scoreDec = parseInt(dataset.score, 10);

  if (item === 'drum') {
    buyDrum(add);
  } else if (item === 'first-aid') {
    buyFirstAid();
  } else {
    return;
  }

  noise(audioURI, audioBuy);

  eventScoreDec.dec = scoreDec;
  document.dispatchEvent(eventScoreDec);

  currentScore -= scoreDec;
  buyLockUnlock();
}

function buyDrum(add) {
  eventBuyDrum.add = add;
  document.dispatchEvent(eventBuyDrum);
}

function buyFirstAid() {
  document.dispatchEvent(eventBuyFirstAid);
}

function closeShop() {
  $body.classList.remove('dont-shoot');
  $store.removeEventListener('click', buy);
  $closeShop.style.animationName = 'close-shop';

  noise(audioURI, audioNextWave);
  setTimeout(closeShopEnd, 800);
}

function closeShopEnd() {
  $closeShop.style.animationName = '';
  $shop.style.transform = 'translateY(100%)';
  $score.classList.remove('score-shop');
  document.dispatchEvent(eventWaveStart);
}

function itemHandler(e) {
  if (!e.target.classList.contains('item')) {
    return;
  }

  noise(audioURI, audioDrumHover);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShop);
}

document.addEventListener('waveEnd', openShop);
$store.addEventListener('mouseover', itemHandler);
$closeShop.addEventListener('click', closeShop);
document.addEventListener('gameOver', gameOver);
