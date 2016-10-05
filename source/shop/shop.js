const
  $shop = document.querySelector('.shop'),
  $money = $shop.querySelector('.money'),
  $items = $shop.querySelector('.items').children,
  $closeShop = $shop.querySelector('.close-shop'),
  eventCloseShop = new Event('closeShop');

function openShop() {
  $shop.style.transform = 'translateY(0)';
}

function closeShop() {
  $shop.style.transform = 'translateY(-100%)';
  document.dispatchEvent(eventCloseShop);
}

document.addEventListener('waveEnd', openShop);
$closeShop.addEventListener('click', closeShop);
