const
  $nextWaveTimer = document.querySelector('.next-wave-timer'),
  nextTimeMax = 4,
  numberWaveMax = 3,
  eventEnemyCreate = new Event('enemyCreate'),
  eventWaveEnd = new Event('waveEnd');

let
  waveEnd = false,
  nextWaveTimeout,
  nextTimeCurrent = nextTimeMax,
  numberWaveCurrent = 0;

$nextWaveTimer.style.animationName = 'blink';

function nextWave() {
  if (nextTimeCurrent < 0) {
    nextTimeCurrent = nextTimeMax;
    numberWaveCurrent += 1;
    document.dispatchEvent(eventEnemyCreate);

    // волны закончились, по уничтожению показывается магазин
    if (numberWaveCurrent === numberWaveMax) {
      $nextWaveTimer.style.animationName = '';
      nextTimeCurrent = 0;
      waveEnd = true;
      return;
    }
  }

  nextWaveTimeout = setTimeout(timer, 1000);
}

function timer() {
  $nextWaveTimer.textContent = nextTimeCurrent;
  nextTimeCurrent -= 1;

  nextWave();
}

function noEnemies() {
  if (!waveEnd) {
    return;
  }

  document.dispatchEvent(eventWaveEnd);
}

function gameOver() {
  clearTimeout(nextWaveTimeout);
}

document.addEventListener('startGame', nextWave);
document.addEventListener('noEnemies', noEnemies);
document.addEventListener('closeShop', nextWave);
document.addEventListener('gameOver', gameOver);
