import noise from './../helper/noise';

const
  $nextTime = document.querySelector('.next-time'),
  nextTimeDefault = 4,

  audioURI = window.audioURI,
  audioTimerTick = window.audioSprite.timer_tick,

  eventEnemyCreate = new Event('enemyCreate'),
  eventWaveEnd = new Event('waveEnd');

let
  waveCount = 0,
  isWaveEnd,
  nextTimeTimeout,
  nextTimeCurrent = 0,
  numberWaveDefault = 4,
  numberWaveCurrent = 0;

function run() {
  isWaveEnd = false;

  setTimeout(runTimer, 1000);
  nextTime();
}

function runTimer() {
  $nextTime.style.animationPlayState = 'running';
}

function nextTime() {
  $nextTime.style.transform = `rotateX(-${90 * nextTimeCurrent}deg)`;
  nextTimeTimeout = setTimeout(nextWaveTime, 1000);
}

function nextWaveTime() {
  nextTimeCurrent += 1;
  noise(audioURI, audioTimerTick);

  if (nextTimeCurrent === nextTimeDefault + 1) {
    nextTimeCurrent = 0;
    nextWave();
  }

  if (!isWaveEnd) {
    nextTime();
  }
}

function nextWave() {
  waveCount += 1;
  numberWaveCurrent += 1;
  document.dispatchEvent(eventEnemyCreate);
  waveEnd();
}

function waveEnd() {
  if (numberWaveCurrent === numberWaveDefault) {
    $nextTime.style.transform = 'rotateX(-90deg)';
    $nextTime.style.animationPlayState = 'paused';
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
