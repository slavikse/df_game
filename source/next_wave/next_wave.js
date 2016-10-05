const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  nextTimeFull = 4,
  eventEnemyCreate = new Event('enemyCreate');

let
  nextWaveTimeout = null,
  nextTimeCurrent = nextTimeFull;

$nextWaveTime.style.animationName = 'rotate';

function nextWave() {
  if (nextTimeCurrent < 0) {
    nextTimeCurrent = nextTimeFull;
    document.dispatchEvent(eventEnemyCreate);
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

document.addEventListener('startGame', nextWave);
document.addEventListener('gameOver', gameOver);
