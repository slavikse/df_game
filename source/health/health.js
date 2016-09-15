const
  $healths = document.querySelector('.health').children, // сердечки здоровья
  $healthCriticalPaused = document.querySelector('.health-critical-paused'), // предупреждающий фон. мало хп
  $heartbeat = document.querySelector('.heartbeat'), // звук биения
  $event = document.querySelector('.event'),
  healthStateClasses = [ // иконки сердца
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

  /** последняя половинка сердца закончилась */
  if (healthState < 0) {
    resetHealthState();
  }

  /** последняя половинка сердца последнего сердца */
  if (health < 1 && healthState < 1) {
    lowHealth();
  }

  /** game over */
  if (health < 0) {
    gameOver();
  }
}

function resetHealthState() {
  health -= 1;
  healthState = healthStateFull;
}

/** моргание сердца. осталось половинка последнего сердца */
function lowHealth() {
  $healths[health].classList.add('health-blink');
  $healthCriticalPaused.classList.add('health-critical');
  $heartbeat.play();
}

function gameOver() {
  console.log('game-over');
  // $healthCriticalPaused.textContent = 'game-over';
  // $healthCriticalPaused.classList.add('game-over'); // при критическом здоровье вешается класс
}

function HKeyHandler(e) {
  if (e.keyCode === 72) { // H
    regeneration();
  }
}

function regeneration() {

}

$event.addEventListener('damage', damage);
window.addEventListener('keyup', HKeyHandler);
