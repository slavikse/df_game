import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

const
  $body = document.querySelector('body'),
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.cat-to-bad'),
  $event = $body.querySelector('.event'),
  eventFirstAidDropped = new Event('firstAidDropped'),
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: -25}}),
  eventEnemyCreate = new Event('enemyCreate'),
  audioSprite = window.audioSprite,
  audioToBad = window.audioSpriteJson.to_bad,
  playingFieldResize = throttle(playingField, 200);

let
  catChangePositionTimeout,
  catHidden = true,
  playingFieldWidth,
  playingFieldHeight;

playingField();

function catShow() {
  catChangePositionTimeout = setTimeout(changePosition, 5000);

  /** покажет после того, как сменит позицию */
  setTimeout(() => {
    $catPosition.classList.add('cat-show');
    catHidden = false;
  }, 5200);

  setTimeout(() => {
    catHideThenShow();
    randomDroppedFirstAid();
  }, 15000);
}

function changePosition() {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
  catChangePositionTimeout = setTimeout(changePosition, 5000);
}

function catHideThenShow() {
  clearTimeout(catChangePositionTimeout);
  $catPosition.classList.remove('cat-show');
  catHidden = true;

  setTimeout(() => {
    catShow();
  }, 15000);
}

function randomDroppedFirstAid() {
  const random = range(0, 4); // шанс 20%

  if (random === 3) {
    $event.dispatchEvent(eventFirstAidDropped);
  }
}

function catShoot() {
  if (catHidden) {
    return;
  }

  toBad();

  $event.dispatchEvent(eventScoreChange);
  $event.dispatchEvent(eventEnemyCreate);
}

function toBad() {
  noise(audioSprite, audioToBad);

  $body.classList.add('dont-shoot');
  $toBad.style.animationName = 'cat-to-bad-show';
  $cat.style.animationName = 'cat-flip';

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
    $toBad.style.animationName = '';
    $cat.style.animationName = '';
  }, 1400); // анимация
}

function gameOver() {
  clearTimeout(catChangePositionTimeout);
  $cat.remove();
}

function playingField() {
  const
    catWidth = 94,
    catHeight = 148,
    panelHeight = 100;

  playingFieldWidth = window.innerWidth - catWidth;
  playingFieldHeight = window.innerHeight - catHeight - panelHeight;
}

$event.addEventListener('catShoot', catShoot);
$event.addEventListener('gameOver', gameOver);
window.addEventListener('resize', playingFieldResize);

export default catShow;
