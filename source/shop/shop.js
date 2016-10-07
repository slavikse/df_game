const
  $body = document.body,
  $shop = $body.querySelector('.shop'),
  $moneyCurrent = $shop.querySelector('.money-current'),
  $bullets = $shop.querySelector('.bullets'),
  $closeShop = $shop.querySelector('.close-shop'),
  eventBuyBullets = new Event('buyBullets'),
  eventCloseShop = new Event('closeShop');

function openShop() {
  $bullets.addEventListener('click', buyBullets);
  $shop.style.transform = 'translateY(0)';

  /** чтобы счет успел записаться */
  setTimeout(() => {
    $moneyCurrent.textContent = sessionStorage.getItem('score');
  }, 100);
}

function buyBullets() {
  eventBuyBullets.add = 5;

  document.dispatchEvent(eventBuyBullets);
}

function closeShop() {
  $bullets.removeEventListener('click', buyBullets);
  $closeShop.style.animationName = 'close-shop';

  setTimeout(() => {
    $closeShop.style.animationName = '';
    $shop.style.transform = 'translateY(-100%)';
    document.dispatchEvent(eventCloseShop);
  }, 1000);
}

function gameOver() {
  document.removeEventListener('waveEnd', openShop);
}

document.addEventListener('waveEnd', openShop);
$closeShop.addEventListener('click', closeShop);
document.addEventListener('gameOver', gameOver);
