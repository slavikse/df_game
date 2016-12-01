const $shopTime = document.querySelector('.shop-time');
const texts = ['Передохни!', 'Понеслась!'];
const textsLength = texts.length;

let currentTextIndex = 0;
let shopTimeTimerID;

// если конец игры, то успеет отменить показ уведомляшки
function shopTimeDelay() {
  shopTimeTimerID = setTimeout(shopTime, 200);
}

function shopTime() {
  textToggle();
  $shopTime.style.animationName = 'shop-time';
  setTimeout(shopTimeEnd, 1500);
}

function textToggle() {
  $shopTime.textContent = texts[currentTextIndex];
  currentTextIndex = (currentTextIndex + 1) % textsLength;
}

function shopTimeEnd() {
  $shopTime.textContent = '';
  $shopTime.style.animationName = '';
}

function gameOver() {
  clearTimeout(shopTimeTimerID);
}

document.addEventListener('waveEnd', shopTimeDelay);
document.addEventListener('waveStart', shopTimeDelay);
document.addEventListener('gameOver', gameOver);
