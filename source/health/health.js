import noise from '../helper/noise';

const
  $healths = document.querySelector('.health').children,
  $healthCritical = document.querySelector('.health-critical'),
  $event = document.querySelector('.event'),
  healthStateClasses = [
    'icon-heart_abadon', // пустое
    'icon-heart_half', // половинка
    'icon-heart' // целое
  ],
  healthFull = 2, // 3 состояния сердца [0-2]
  healthStateFull = 1; // состояние сердца из [0-1] потому, что изначально сердце целое

let
  health = healthFull,
  healthState = healthStateFull;

function damage() {
  hit();

  /* последняя половинка сердца закончилась */
  if (healthState < 0) {
    health -= 1;
    healthState = healthStateFull;
  }

  if (health < 0) {
    gameOver();
  }
}

function hit() {
  $healths[health].className = healthStateClasses[healthState];
  $healths[health].style.animationName = 'health-blink';
  $healthCritical.style.animationName = 'health-critical';
  noise('audio/heartbeat.mp3');
  healthState -= 1;

  setTimeout(() => {
    $healths[health].style.animationName = '';
    $healthCritical.style.animationName = '';
  }, 1200); // 2 анимации по 600 ms
}

function gameOver() {
  console.log('game over');
  // $body.classList.add('game-over');
}

function regeneration() {

}

function HKeyHandler(e) {
  if (e.keyCode === 72) { // H
    regeneration();
  }
}

$event.addEventListener('damage', damage);
window.addEventListener('keyup', HKeyHandler);
