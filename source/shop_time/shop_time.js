const $shopTime = document.querySelector('.shop-time');
const texts = ['Передохни!', 'Понеслась!'];
const textsLength = texts.length - 1;

let i = 0;

function shopTime() {
  textToggle();
  $shopTime.style.animationName = 'shop-time';

  setTimeout(shopTimeEnd, 1500);
}

function textToggle() {
  $shopTime.textContent = texts[i];

  if (i === textsLength) {
    i = 0;
  } else {
    i += 1;
  }
}

function shopTimeEnd() {
  $shopTime.textContent = '';
  $shopTime.style.animationName = '';
}

function shopTimeDelay() {
  setTimeout(shopTime, 300);
}

document.addEventListener('waveEnd', shopTime);
document.addEventListener('waveStart', shopTimeDelay);
