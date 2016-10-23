const
  $shopTimeWrap = document.querySelector('.shop-time-wrap'),
  $shopTime = $shopTimeWrap.querySelector('.shop-time'),
  texts = [
    'Передохни!',
    'Понеслась!'
  ];

let i = 0;

function shopTime() {
  const text = texts[i];

  $shopTimeWrap.style.animationName = 'shop-time-wrap';
  $shopTime.textContent = text;
  $shopTime.style.animationName = 'shop-time';

  indexInc();
  setTimeout(shopTimeEnd, 1500);
}

function indexInc() {
  if (i === texts.length - 1) {
    i = 0;
  } else {
    i += 1;
  }
}

function shopTimeEnd() {
  $shopTimeWrap.style.animationName = '';
  $shopTime.style.animationName = '';
}

function shopTimeDelay() {
  setTimeout(shopTime, 300);
}

document.addEventListener('waveEnd', shopTime);
document.addEventListener('waveStart', shopTimeDelay);
