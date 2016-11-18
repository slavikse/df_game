import range from 'libs/range';
import throttle from 'libs/throttle';
import {audioURI, audioSprite} from './../helper/audio_sprite.js';
import noise from './../helper/noise.js';

const $body = document.body;
const $catPosition = $body.querySelector('.cat-position');
const $cat = $catPosition.querySelector('.cat');
const $toBad = $body.querySelector('.to-bad');
const audioToBad = audioSprite.to_bad;
const playingFieldResize = throttle(playingField, 500);
const moveTime = 5000;

let moveTimerID;
let hideTimerID;
let runTimerID;
let playingFieldWidth;
let playingFieldHeight;
let eventEnemyCreate = new Event('enemyCreate');

eventEnemyCreate.enemyCloneCount = 2;

playingField();

function run() {
  moveTimerID = setTimeout(move, moveTime);
  setTimeout(show, moveTime + 100);
  hideTimerID = setTimeout(hide, moveTime * 3 + 100);
}

function move() {
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  $catPosition.style.transform = `translate(${x}px, ${y}px)`;
  moveTimerID = setTimeout(move, moveTime);
}

function show() {
  $catPosition.classList.add('cat-show');
}

function hide() {
  stop();
  runTimerID = setTimeout(run, moveTime * 2);
}

function stop() {
  $catPosition.classList.remove('cat-show');

  clearTimeout(moveTimerID);
  clearTimeout(hideTimerID);
  clearTimeout(runTimerID);
}

function shoot() {
  hide();
  toBad();

  document.dispatchEvent(eventEnemyCreate);
}

function toBad() {
  noise(audioURI, audioToBad);

  $body.classList.add('dont-shoot');
  $cat.style.animationName = 'cat-flip';
  $toBad.style.animationName = 'to-bad';

  setTimeout(toBadHide, 1400); // анимация
}

function toBadHide() {
  $body.classList.remove('dont-shoot');
  $cat.style.animationName = '';
  $toBad.style.animationName = '';
}

function playingField() {
  const catWidth = 94;
  const catHeight = 148;
  const panelHeight = 100;

  playingFieldWidth = window.innerWidth - catWidth;
  playingFieldHeight = window.innerHeight - catHeight - panelHeight;
}

function gameOver() {
  $cat.remove();
}

document.addEventListener('startGame', run);
document.addEventListener('catShoot', shoot);
document.addEventListener('waveEnd', stop);
document.addEventListener('waveStart', run);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);
