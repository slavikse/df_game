import noise from './../helper/noise';

const
  $body = document.body,
  $score = $body.querySelector('.score'),
  $shop = $body.querySelector('.shop'),
  $store = $shop.querySelector('.store'),
  $storeItems = $store.children,
  storeItemsLength = $storeItems.length,
  $closeShop = $shop.querySelector('.close-shop'),
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  audioBulletHover = audioSprite.bullet_hover,
  audioBuy = audioSprite.buy,
  audioBuyBlock = audioSprite.buy_block,
  audioNextWave = audioSprite.next_wave,
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

function bulletHover(e) {
  if(!e.target.classList.contains('bullet')) {
    return;
  }

  noise(audioURI, audioBulletHover);
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

function buyBullets(e) {
  const target = e.target;

  if (!target.classList.contains('bullet')) {
    return;
  }

  const
    dataset = target.dataset,
    scoreDec = parseInt(dataset.score, 10);

  if (currentScore - scoreDec < 0) {
    noise(audioURI, audioBuyBlock);

    /** GOD MOD */

    if (!window.god) {
      return;
    }

    /** / GOD MOD */

    // return;
  }

  noise(audioURI, audioBuy);

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

  noise(audioURI, audioNextWave);

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
$store.addEventListener('mouseover', bulletHover);
$closeShop.addEventListener('click', closeShop);
document.addEventListener('gameOver', gameOver);
