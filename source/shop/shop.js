import noise from './../helper/noise';

const
  $body = document.body,
  $score = $body.querySelector('.score'),
  $shop = $body.querySelector('.shop'),
  $store = $shop.querySelector('.store'),
  $storeItems = $store.children,
  storeItemsLength = $storeItems.length,
  $closeShop = $shop.querySelector('.close-shop'),
  audioSprite = window.audioSprite,
  audioNextWave = window.audioSpriteJson.next_wave,
  eventBuyBullets = new Event('buyBullets'),
  eventScoreDec = new Event('scoreDec'),
  eventCloseShop = new Event('closeShop');

let currentScore;

function openShop() {
  $body.classList.add('dont-shoot');

  $shop.style.transform = 'translateY(0)';
  $score.classList.add('score-shop');
  $store.addEventListener('click', buyBullets);

  /** чтобы счет успел записаться */
  setTimeout(setScore, 50);
}

function setScore() {
  currentScore = sessionStorage.getItem('score');

  buyLockUnlock();
}

function buyLockUnlock() {
  for (let i = 0, len = storeItemsLength; i < len; i++) {
    const item = $storeItems[i];

    if (parseInt(item.dataset.score, 10) > currentScore) {
      item.classList.add('buy-lock');
    } else {
      item.classList.remove('buy-lock');
    }
  }
}

function buyBullets(e) {
  const target = e.target;

  if (!target.classList.contains('bullet')) {
    return;
  }

  const
    dataset = target.dataset,
    scoreDec = parseInt(dataset.score, 10);

  if (currentScore - scoreDec < 0) {

    /** GOD MOD */

    if (!window.god) {
      return;
    }

    /** / GOD MOD */

    // return;
  }

  eventBuyBullets.add = parseInt(dataset.add, 10);
  document.dispatchEvent(eventBuyBullets);

  eventScoreDec.dec = scoreDec;
  document.dispatchEvent(eventScoreDec);

  currentScore -= scoreDec;
  buyLockUnlock();
}

function closeShop() {
  $body.classList.remove('dont-shoot');

  $store.removeEventListener('click', buyBullets);
  $closeShop.style.animationName = 'close-shop';

  noise(audioSprite, audioNextWave);

  setTimeout(() => {
    $closeShop.style.animationName = '';
    $shop.style.transform = 'translateY(100%)';
    $score.classList.remove('score-shop');
    document.dispatchEvent(eventCloseShop);
  }, 800);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShop);
}

document.addEventListener('waveEnd', openShop);
$closeShop.addEventListener('click', closeShop);
document.addEventListener('gameOver', gameOver);
