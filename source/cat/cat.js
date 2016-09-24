import range from 'libs/range';
import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $event = $body.querySelector('.event'),
  $catPosition = $body.querySelector('.cat-position'),
  $toBad = $body.querySelector('.cat-to-bad'),
  eventScore = new CustomEvent('scoreChange', {detail: {increment: -25}}),
  eventEnemyCreate = new Event('enemyCreate'),
  width = window.innerWidth - 150,
  height = window.innerHeight - 150 - 100; // 150 - размеры моделек монстров, 100 - под скорбоард

function catShow() {
  setInterval(changePosition, 5000);

  setTimeout(() => {
    $catPosition.style.opacity = 1;
  }, 5500);
}

function changePosition() {
  const
    x = range(0, width),
    y = range(0, height);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
}

function toBad() {
  noise('audio/to_bad.mp3');

  $body.classList.add('dont-shoot');
  $toBad.style.animationName = 'cat-to-bad-show';
  $catPosition.children[0].style.animationName = 'cat-flip';

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
    $toBad.style.animationName = '';
    $catPosition.children[0].style.animationName = '';

    changePosition(); // котик сменит позицию после флипа
  }, 1400);
}

$event.addEventListener('catShoot', () => {
  toBad();

  $event.dispatchEvent(eventScore);
  $event.dispatchEvent(eventEnemyCreate);
});

export default catShow;
