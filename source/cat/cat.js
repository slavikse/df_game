import noise from './../helper/noise';
import range from 'libs/range';
import throttle from 'libs/throttle';

const
  $body = document.body,
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.cat-to-bad'),
  eventScoreDec = new Event('scoreDec'),
  eventEnemyCreate = new Event('enemyCreate'),
  eventFirstAidDropped = new Event('firstAidDropped'),
  audioSprite = window.audioSprite,
  audioToBad = window.audioSpriteJson.to_bad,
  playingFieldResize = throttle(playingField, 200);

let
  catPositionTimeout,
  catVisibleTimeout,
  playingFieldWidth,
  playingFieldHeight;

/** за выстрел в котика */
eventScoreDec.dec = 25;

playingField();

function catRun() {
  catPositionTimeout = setTimeout(changePosition, 5000);

  setTimeout(() => {
    $catPosition.classList.add('cat-show');
  }, 5100);

  catVisibleTimeout = setTimeout(() => {
    catVisible();
    droppedFirstAid();
  }, 15100);
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

function droppedFirstAid() {
  const random = range(0, 4); // шанс 20%

  if (random === 3) {
    document.dispatchEvent(eventFirstAidDropped);
  }
}

function catStop() {
  catHide();
  clearTimeout(catVisibleTimeout);
}

function catShoot() {
  if (!$catPosition.classList.contains('cat-show')) {
    return;
  }

  document.dispatchEvent(eventScoreDec);
  document.dispatchEvent(eventEnemyCreate);

  catVisible();
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

function startGame() {
  catRun();

  document.addEventListener('catShoot', catShoot);
  document.addEventListener('waveEnd', catStop);
  document.addEventListener('closeShop', catRun);
  document.addEventListener('resize', playingFieldResize);
  document.addEventListener('gameOver', gameOver);
}

function gameOver() {
  $cat.remove();

  document.removeEventListener('catShoot', catShoot);
  document.removeEventListener('waveEnd', catStop);
  document.removeEventListener('closeShop', catRun);
  document.removeEventListener('resize', playingFieldResize);
  document.removeEventListener('gameOver', gameOver);
}

document.addEventListener('startGame', startGame);
