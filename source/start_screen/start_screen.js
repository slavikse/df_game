import './../panel/panel';
import catShow from './../cat/cat';
import './../enemy/enemy';
import shoot from './../shoot/shoot';
import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $event = document.querySelector('.event'),
  $startScreen = document.querySelector('.start-screen'),
  $newGame = $startScreen.querySelector('.new-game'),
  $panel = document.querySelector('.panel'),
  $ambient = document.querySelector('.ambient'),
  $forestNight = document.querySelector('.forest-night'),
  eventStartGame = new Event('startGame');

function initGame() {
  $newGame.removeEventListener('click', initGame);

  $newGame.classList.add('new-game-start');
  noise('audio/intro.mp3');

  initInterface();
  startGame();
}

function initInterface() {
  $panel.style.opacity = 1;
  $forestNight.style.opacity = 1;

  setTimeout(() => {
    $newGame.style.opacity = 0;
  }, 800);

  setTimeout(() => {
    $startScreen.remove();
    window.addEventListener('click', shoot);
  }, 1000);
}

function startGame() {
  setTimeout(() => {
    $body.style.backgroundImage = 'none'; // освобождаем память
    $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
  }, 6000);

  catShow();

  $event.dispatchEvent(eventStartGame);
}

$newGame.addEventListener('click', initGame);
