import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

const
  $body = document.querySelector('body'),
  $event = $body.querySelector('.event'),
  $catPosition = $body.querySelector('.cat-position'),
  $cat = $catPosition.querySelector('.cat'),
  $toBad = $body.querySelector('.cat-to-bad'),
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: -25}}),
  eventEnemyCreate = new Event('enemyCreate');

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

function toBad() {
  noise('audio/to_bad.mp3');

  $body.classList.add('dont-shoot');
  $toBad.style.animationName = 'cat-to-bad-show';
  $cat.style.animationName = 'cat-flip';

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
    $toBad.style.animationName = '';
    $cat.style.animationName = '';
  }, 1400);
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

export default catShow;
