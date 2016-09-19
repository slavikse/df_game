import loopCreateCat from './../cat/cat.js';
import loopCreateEnemy from './../enemy/enemy.js';

const
  $body = document.querySelector('body'),
  $event = document.querySelector('.event'),
  eventNextWaveTimer = new Event('nextWaveTimer');

function startScreen() {

// инициация игры по клику

  // $body

  $event.dispatchEvent(eventNextWaveTimer);
  loopCreateCat();
  loopCreateEnemy();
}

$event.addEventListener('gameLoaded', startScreen);
