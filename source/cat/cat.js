import range from 'libs/range';
import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $event = document.querySelector('.event'), // создается событие при киле котика :(
  $temp = document.querySelector('.temp'), // для вставки в dom
  $shootToBad = document.querySelector('.cat-to-bad'), // уведомляшка при киле котика :(
  imagesURI = [ // пути до моделей котиков :)
    'image/cat1.png', // с прозрачностью
    'image/cat2.png',
    'image/cat3.png',
    'image/cat4.png'
  ],
  soundsURI = [ // пути до звуков при попадании в котика :(
    'audio/to_bad.mp3'
  ],
  eventScore = new CustomEvent('scoreChange', {
    detail: {increment: -25}
  }),
  eventEnemyCreate = new Event('enemyCreate');

let
  cat = null,
  timerID = null;

function loopCreateCat() {
  setInterval(createCat, 10000);
}

function createCat() {
  createCatElement();

  setTimeout(() => {
    cat.classList.add('cat-dodge');
  }, 2850);

  timerID = setTimeout(() => {
    requestAnimationFrame(() => {
      cat.remove();
    });
  }, 3000);

  requestAnimationFrame(() => {
    $temp.appendChild(cat);
  });
}

function createCatElement() {
  let
    random = range(0, imagesURI.length - 1),
    x = range(0, window.innerWidth - 120),
    y = range(0, window.innerHeight - 120 - 100); // 120 - размеры моделек монстров, 100 - под скорбоард

  cat = document.createElement('img');
  cat.classList.add('cat');
  cat.style.top = `${y}px`;
  cat.style.left = `${x}px`;
  cat.src = imagesURI[random];
  cat.draggable = false;
}

/** уворот котика от выстрела */
function dodge() {
  cat.classList.add('cat-dodge');

  setTimeout(() => {
    requestAnimationFrame(() => {
      cat.remove();
    });
  }, 300);
}

/** надпись на ввесь экран при попытке подстрелить котика */
function toBad() {
  noise(soundsURI);

  $body.classList.add('dont-shoot');
  $shootToBad.classList.add('cat-shoot-to-bad');

  setTimeout(() => {
    $body.classList.remove('dont-shoot');
    $shootToBad.classList.remove('cat-shoot-to-bad');
  }, 1400);
}

$event.addEventListener('catShoot', () => {
  clearTimeout(timerID);
  dodge();
  toBad();
  $event.dispatchEvent(eventScore);
  $event.dispatchEvent(eventEnemyCreate);
});

export default loopCreateCat;
