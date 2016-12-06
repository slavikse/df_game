const $shopTime = document.querySelector('.shop-time');
const shopTextDefault = ['ЗАКУП', 'В БОЙ!'];
const textLength = shopTextDefault.length;
const bossStyleTextDefault = 'boss-time-text';
const bossTextDefault = ['BOSS', 'FIGHT!'];

let currentTextIndex = 0;
let shopTimeTimerID;
let currentUseText = shopTextDefault;

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
  $shopTime.textContent = currentUseText[currentTextIndex];
  currentTextIndex = (currentTextIndex + 1) % textLength;
}

function shopTimeEnd() {
  $shopTime.textContent = '';
  $shopTime.style.animationName = '';
}

function bossCame() {
  $shopTime.classList.add(bossStyleTextDefault);
  currentUseText = bossTextDefault;
}

function bossGone() {
  $shopTime.classList.remove(bossStyleTextDefault);
  currentUseText = shopTextDefault;
}

function gameOver() {
  clearTimeout(shopTimeTimerID);
}

document.addEventListener('waveEnd', shopTimeDelay);
document.addEventListener('waveStart', shopTimeDelay);
document.addEventListener('bossCame', bossCame);
document.addEventListener('bossGone', bossGone);
document.addEventListener('gameOver', gameOver);
