const
  $nextTime = document.querySelector('.next-time'),
  nextTimeDefault = 4,
  eventEnemyCreate = new Event('enemyCreate'),
  eventWaveEnd = new Event('waveEnd');

let
  waveCount = 0,
  isWaveEnd,
  nextTimeTimeout,
  nextTimeCurrent = nextTimeDefault,
  numberWaveDefault = 4,
  numberWaveCurrent = 0;

function run() {
  $nextTime.style.animationName = 'tick';
  isWaveEnd = false;

  nextTime();
}

function nextTime() {
  nextTimeTimeout = setTimeout(nextWaveTime, 1000);
}

function nextWaveTime() {
  $nextTime.textContent = nextTimeCurrent;
  nextTimeCurrent -= 1;

  if (nextTimeCurrent === -1) {
    nextTimeCurrent = nextTimeDefault;
    nextWave();
  }

  if (!isWaveEnd) {
    nextTime();
  }
}

function nextWave() {
  $nextTime.textContent = '+';
  waveCount += 1;
  numberWaveCurrent += 1;
  document.dispatchEvent(eventEnemyCreate);
  waveEnd();
}

function waveEnd() {
  if (numberWaveCurrent === numberWaveDefault) {
    $nextTime.style.animationName = '';
    $nextTime.textContent = '';
    numberWaveCurrent = 0;
    isWaveEnd = true;
  }
}

function noEnemy() {
  if (isWaveEnd) {
    document.dispatchEvent(eventWaveEnd);
  }
}

function gameOver() {
  clearTimeout(nextTimeTimeout);
  waveCountStatistic();
}

function waveCountStatistic() {
  let waveCountEvent = new Event('waveCount');
  waveCountEvent.waveCount = waveCount;
  document.dispatchEvent(waveCountEvent)
}

document.addEventListener('startGame', run);
document.addEventListener('noEnemy', noEnemy);
document.addEventListener('waveStart', run);
document.addEventListener('gameOver', gameOver);
