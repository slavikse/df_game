import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $ticker = document.querySelector('.ticker');
const tickDefault = 4;
const numberWaveDefault = 3; // 3
const audioTick = audioSprite.ticker_tick;
const eventEnemyCreate = new Event('enemyCreate');
const eventWaveEnd = new Event('waveEnd');
const eventBossComing = new Event('bossComing');
const eventBoss = new Event('boss');

let isWaveEnd;
let tickCurrent = 0;
let numberWaveCurrent = 0;
let tickerNextTimerID;
let waveCountStat = 0;
let isBossCame = false;

function runWave() {
  if (isBossCame) {
    // отписываемся после магаз паузы, мобы при боссе не отсчитываются
    document.removeEventListener('noEnemy', noEnemy);
    document.dispatchEvent(eventBoss);
  } else {
    isWaveEnd = false;
    ticker();
  }
}

function ticker() {
  tickerNextTimerID = setTimeout(tick, 1000);
}

function tick() {
  const tickerRotateX = 360 - 90 * tickCurrent;

  $ticker.style.transform = `rotateX(${tickerRotateX}deg)`;
  setTimeout(noise.bind(null, audioURI, audioTick), 400); // анимация падения

  if (isWaveEnd) {
    tickPause();
  } else {
    tickNext();
  }
}

function tickPause() {
  $ticker.style.transform = 'rotateY(90deg)'; // пауза ||
}

function tickNext() {
  if (tickCurrent === tickDefault) {
    tickPlus();
    waveExtra();
  } else {
    tickCurrent += 1;
  }

  ticker();
}

function tickPlus() {
  $ticker.style.transform = 'rotateY(-90deg)'; // волна +
}

function waveExtra() {
  tickCurrent = 0;
  numberWaveCurrent += 1;

  if (numberWaveCurrent === numberWaveDefault) {
    waveEnd();
  }

  document.dispatchEvent(eventEnemyCreate);
  document.dispatchEvent(eventBossComing);
  saveWaveCountStat();
}

function waveEnd() {
  isWaveEnd = true;
  numberWaveCurrent = 0;
  setTimeout(tickPause, 1000); // для показа '+' перед '||'
}

/** только когда все волны закончились по
 * эвенту об отсутствии врагов на поле,
 * создается эвент по окончании всех волн */
function noEnemy() {
  if (isWaveEnd) {
    document.dispatchEvent(eventWaveEnd);
  }
}

function bossCame() {
  isBossCame = true;
}

function bossGone() {
  isBossCame = false;
  document.addEventListener('noEnemy', noEnemy);
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
  clearTimeout(tickerNextTimerID);
  waveCountStatistic();
}

document.addEventListener('startGame', runWave);
document.addEventListener('noEnemy', noEnemy);
document.addEventListener('waveStart', runWave);
document.addEventListener('bossCame', bossCame);
document.addEventListener('bossGone', bossGone);
document.addEventListener('gameOver', gameOver);
