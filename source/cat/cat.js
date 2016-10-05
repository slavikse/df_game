import noise from './../helper/noise';
import range from 'libs/range';
import throttle from 'libs/throttle';

const
  $body = document.body,
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.cat-to-bad'),
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: -25}}),
  eventEnemyCreate = new Event('enemyCreate'),
  eventFirstAidDropped = new Event('firstAidDropped'),
  audioSprite = window.audioSprite,
  audioToBad = window.audioSpriteJson.to_bad,
  playingFieldResize = throttle(playingField, 200);

let
  catTimeout,
  playingFieldWidth,
  playingFieldHeight;

playingField();

function cat() {
  catTimeout = setTimeout(changePosition, 5000);

  setTimeout(() => {
    $catPosition.classList.add('cat-show');
  }, 5100);

  setTimeout(() => {
    catHideAndShow();
    droppedFirstAid();
  }, 15100);
}

function changePosition() {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
  catTimeout = setTimeout(changePosition, 5000);
}

function catHideAndShow() {
  catHide();

  catTimeout = setTimeout(() => {
    cat();
  }, 10100);
}

function catHide() {
  clearTimeout(catTimeout);
  $catPosition.classList.remove('cat-show');
}

function droppedFirstAid() {
  const random = range(0, 4); // шанс 20%

  if (random === 3) {
    document.dispatchEvent(eventFirstAidDropped);
  }
}

function catShoot() {
  if (!$catPosition.classList.contains('cat-show')) {
    return;
  }

  document.dispatchEvent(eventScoreChange);
  document.dispatchEvent(eventEnemyCreate);

  catHideAndShow();
  toBad();
}

function toBad() {
  noise(audioSprite, audioToBad);

  $body.classList.add('dont-shoot');
  $toBad.style.animationName = 'cat-to-bad';
  $cat.style.animationName = 'cat-flip';

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
    $toBad.style.animationName = '';
    $cat.style.animationName = '';
  }, 1400); // анимация
}

function playingField() {
  const
    catWidth = 94,
    catHeight = 148,
    panelHeight = 100;

  playingFieldWidth = window.innerWidth - catWidth;
  playingFieldHeight = window.innerHeight - catHeight - panelHeight;
}

function gameOver() {
  clearTimeout(catTimeout);
  $cat.remove();
}

document.addEventListener('startGame', cat);
document.addEventListener('catShoot', catShoot);
document.addEventListener('waveEnd', catHide);
document.addEventListener('closeShop', cat);
document.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);
