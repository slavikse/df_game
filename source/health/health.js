const
  $healths = document.querySelector('.health').children,
  $healthCriticalPaused = document.querySelector('.health-critical-paused'), // расположен в панеле
  $heartbeat = document.querySelector('.heartbeat'),
  $event = document.querySelector('.event'),
  healthStateClasses = [
    'icon-heart_abadon', // пустое
    'icon-heart_half', // половинка
    'icon-heart' // целое
  ],
  healthFull = 2, // 3 сердца [0-2]
  healthStateFull = 1, // состояние сердца из [0-1] потому, что изначально сердце целое
  healthAllState = healthStateClasses.length - 1; // кол-во всех состояний сердца: пустое, половинка, полное [0-2]

let health = healthFull,
  healthState = healthStateFull;

function damage() {
  $healths[health].className = healthStateClasses[healthState];
  healthState -= 1;

  hit();

  /* последняя половинка сердца закончилась */
  if (healthState < 0) {
    resetHealthState();
  }

  /* последняя половинка сердца последнего сердца */
  if (health < 1 && healthState < 1) {
    lowHealth();
  }

  /* game over */
  if (health < 0) {
    gameOver();
  }
}

/* экран краснеет от урона на пару ms */
function hit() {
  $healthCriticalPaused.classList.add('health-critical');

  /** TODO звук получения урона */

  setTimeout(() => {
    $healthCriticalPaused.classList.remove('health-critical');
  }, 500);
}

function resetHealthState() {
  health -= 1;
  healthState = healthStateFull;
}

/* моргание последней половинки сердца */
function lowHealth() {
  $healths[health].classList.add('health-blink');
  $healthCriticalPaused.classList.add('health-critical');
  $heartbeat.play();
}

function gameOver() {
  $healthCriticalPaused.textContent = 'game-over';
  $healthCriticalPaused.classList.add('game-over'); // при критическом здоровье вешается класс
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
