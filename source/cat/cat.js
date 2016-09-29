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
  audioSpriteJson = window.audioSpriteJson;

let
  catChangePositionInterval = null,
  catHidden = true,
  width = window.innerWidth - 94, // ширина котика
  height = window.innerHeight - 148 - 100; // высота котика и панели

function catShow() {
  catChangePositionInterval = setInterval(changePosition, 5000);

  setTimeout(() => {
    $catPosition.classList.add('cat-show');
    catHidden = false;
  }, 5500);

  setTimeout(() => {
    catHideThenShow();
    randomDroppedFirstAid();
  }, 15000);
}

function changePosition() {
  const
    x = range(0, width),
    y = range(0, height);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
}

function catHideThenShow() {
  clearInterval(catChangePositionInterval);
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

function toBad() {
  noise(audioSprite, audioSpriteJson.to_bad);

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
  clearInterval(catChangePositionInterval);
  $cat.remove();
}

$event.addEventListener('catShoot', () => {
  if (catHidden) {
    return;
  }

  toBad();

  $event.dispatchEvent(eventScoreChange);
  $event.dispatchEvent(eventEnemyCreate);
});

const resize = throttle(() => {
  width = window.innerWidth - 94;
  height = window.innerHeight - 148 - 100;
}, 200);

window.addEventListener('resize', resize);
$event.addEventListener('gameOver', gameOver);

export default catShow;
