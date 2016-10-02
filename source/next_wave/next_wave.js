const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  $event = document.querySelector('.event'),
  nextTimeFull = 4,
  eventEnemyCreate = new Event('enemyCreate');

let
  nextWaveTimeout = null,
  nextTimeCurrent = nextTimeFull;

$nextWaveTime.style.animationName = 'pulsar';

function nextWave() {
  if (nextTimeCurrent < 0) {
    nextTimeCurrent = nextTimeFull;
    $event.dispatchEvent(eventEnemyCreate);
  }

  nextWaveTimeout = setTimeout(timer, 1000);
}

function timer() {
  $nextWaveTime.textContent = nextTimeCurrent;
  nextTimeCurrent -= 1;

  nextWave();
}

function gameOver() {
  clearTimeout(nextWaveTimeout);
}

$event.addEventListener('startGame', nextWave);
$event.addEventListener('gameOver', gameOver);
