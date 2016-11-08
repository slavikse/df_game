import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $ticker = document.querySelector('.ticker'),
  tickDefault = 4, // [0-4] - 5 тиков, 5 тик - это +

  audioTick = audioSprite.tick,

  eventEnemyCreate = new Event('enemyCreate'),
  eventWaveEnd = new Event('waveEnd');

let
  waveCount = 0,
  isWaveEnd,
  tickTimeout,
  tickCurrent = 0,
  numberWaveDefault = 4,
  numberWaveCurrent = 0;

function run() {
  isWaveEnd = false;
  tick();
}

function tick() {
  tickTimeout = setTimeout(nextTick, 1000);
}

function nextTick() {
  const tickerRotateX = 360 - 90 * tickCurrent;
  $ticker.style.transform = `rotateX(${tickerRotateX}deg)`;

  setTimeout(noise.bind(null, audioURI, audioTick), 400); // анимация поворота

  if (tickCurrent === tickDefault) {
    extraWave();

    tickCurrent = 0;

    if (!isWaveEnd) {
      tick();
    }
  } else if (!isWaveEnd) {
    tickCurrent += 1;
    tick();
  }
}

function extraWave() {
  tickExtra();

  numberWaveCurrent += 1;
  waveCount += 1;

  if (numberWaveCurrent === numberWaveDefault) {
    waveEnd();
  }

  document.dispatchEvent(eventEnemyCreate);
}

function tickExtra() {
  $ticker.style.transform = 'rotateY(-90deg)'; // доп волна +
}

function waveEnd() {
  setTimeout(tickPause, 1000); // для показа + перед паузой

  isWaveEnd = true;
  numberWaveCurrent = 0;
}

function tickPause() {
  $ticker.style.transform = 'rotateY(90deg)'; // пауза ||
}

/* только когда все волны закончились по
 * эвенту об отсутствии врагов на поле,
 * создается эвент по окончании всех волн */
function noEnemy() {
  if (isWaveEnd) {
    document.dispatchEvent(eventWaveEnd);
  }
}

function gameOver() {
  clearTimeout(tickTimeout);
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
