import shoot from './../shoot/shoot.js';
import './../panel/panel.js';
import catShow from './../cat/cat.js';
import loopCloneEnemy from './../enemy/enemy.js';
import noise from './../helper/noise.js';

const
  $body = document.querySelector('body'),
  $event = document.querySelector('.event'),
  $startScreen = document.querySelector('.start-screen'),
  $newGame = $startScreen.querySelector('.new-game'),
  $panel = document.querySelector('.panel'),
  $ambient = document.querySelector('.ambient'),
  $forestNight = document.querySelector('.forest-night'),
  eventNextWaveTimer = new Event('nextWaveTimer');

function initGame() {
  $newGame.removeEventListener('click', initGame);

  noise('audio/intro.mp3');
  $newGame.classList.add('new-game-start');

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
  }, 5000);

  loopCloneEnemy();
  catShow();

  $event.dispatchEvent(eventNextWaveTimer);
}

$newGame.addEventListener('click', initGame);
