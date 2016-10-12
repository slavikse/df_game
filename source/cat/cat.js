import range from 'libs/range';
import throttle from 'libs/throttle';
import noise from './../helper/noise';

const
  $body = document.body,
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.cat-to-bad'),
  eventEnemyCreate = new Event('enemyCreate'),
  audioURI = window.audioURI,
  audioToBad = window.audioSprite.to_bad,
  playingFieldResize = throttle(playingField, 500);

let
  catPositionTimeout,
  catVisibleTimeout,
  playingFieldWidth,
  playingFieldHeight;

playingField();

function catRun() {
  catPositionTimeout = setTimeout(changePosition, 5000);

  setTimeout(() => {
    $catPosition.classList.add('cat-show');
  }, 5100);

  catVisibleTimeout = setTimeout(catVisible, 15100);
}

function changePosition() {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
  catPositionTimeout = setTimeout(changePosition, 5000);
}

function catVisible() {
  catHide();
  catShow();
}

function catHide() {
  clearTimeout(catPositionTimeout);
  $catPosition.classList.remove('cat-show');
}

function catShow() {
  catVisibleTimeout = setTimeout(catRun, 10000);
}

function catStop() {
  catHide();
  clearTimeout(catVisibleTimeout);
}

function catShoot() {
  if (!$catPosition.classList.contains('cat-show')) {
    return;
  }

  document.dispatchEvent(eventEnemyCreate);

  catVisible();
  toBad();
}

function toBad() {
  noise(audioURI, audioToBad);

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
  $cat.remove();
}

document.addEventListener('startGame', catRun);
document.addEventListener('catShoot', catShoot);
document.addEventListener('waveEnd', catStop);
document.addEventListener('closeShop', catRun);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);

