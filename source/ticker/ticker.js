import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $ticker = document.querySelector('.ticker');
const tickDefault = 4;
const numberWaveDefault = 3; // 3
const audioTick = audioSprite.tick;
const eventEnemyCreate = new Event('enemyCreate');
const eventWaveEnd = new Event('waveEnd');
const eventBossComing = new Event('bossComing');

let isWaveEnd;
let tickCurrent = 0;
let numberWaveCurrent = 0;
let nextTickTimerID;
let pauseTimerID;
let waveCountStat = 0;

function runWave() {
  isWaveEnd = false;
  tick();
}

function tick() {
  nextTickTimerID = setTimeout(nextTick, 1000);
}

function nextTick() {
  const tickerRotateX = 360 - 90 * tickCurrent;
  $ticker.style.transform = `rotateX(${tickerRotateX}deg)`;
  setTimeout(noise.bind(null, audioURI, audioTick), 400); // анимация падения

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
  extraTick();

  numberWaveCurrent += 1;
  saveWaveCountStat();

  if (numberWaveCurrent === numberWaveDefault) {
    waveEnd();
  }

  document.dispatchEvent(eventEnemyCreate);
  document.dispatchEvent(eventBossComing);
}

function extraTick() {
  $ticker.style.transform = 'rotateY(-90deg)'; // доп волна +
}

function waveEnd() {
  pauseTimerID = setTimeout(tickPause, 1000); // для показа + перед паузой

  isWaveEnd = true;
  numberWaveCurrent = 0;
}

function tickPause() {
  $ticker.style.transform = 'rotateY(90deg)'; // пауза ||
}

/** только когда все волны закончились по
 * эвенту об отсутствии врагов на поле,
 * создается эвент по окончании всех волн */
function noEnemy() {
  if (isWaveEnd) {
    document.dispatchEvent(eventWaveEnd);
  }
}

function boss() {
  clearTimeout(nextTickTimerID);
  clearTimeout(pauseTimerID);
  tickPause();
}

function saveWaveCountStat() {
  waveCountStat += 1;
}

function waveCountStatistic() {
  const waveCountEvent = new Event('waveCount');
  waveCountEvent.waveCount = waveCountStat;
  document.dispatchEvent(waveCountEvent);
}

function gameOver() {
  clearTimeout(nextTickTimerID);
  waveCountStatistic();
}

document.addEventListener('startGame', runWave);
document.addEventListener('noEnemy', noEnemy);
document.addEventListener('waveStart', runWave);
document.addEventListener('boss', boss);
document.addEventListener('gameOver', gameOver);
