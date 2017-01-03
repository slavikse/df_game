import range from 'libs/range';
import throttle from 'libs/throttle';
import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $body = document.body;
const $cat = $body.querySelector('.cat');
const $catIcon = $cat.querySelector('.cat__icon');
const $toBad = $body.querySelector('.cat__to-bad');
const audioToBad = audioSprite.cat_to_bad;
const playingFieldResize = throttle(playingField, 500);
const moveTime = 5000;
const eventEnemyCreate = new Event('enemyCreate');

let moveTimerID;
let showTimerID;
let hideTimerID;
let runTimerID;
let playingFieldWidth;
let playingFieldHeight;

eventEnemyCreate.enemyCloneCount = 2;

playingField();

function run() {
  moveTimerID = setTimeout(move, moveTime);
  showTimerID = setTimeout(show, moveTime + 100);
  hideTimerID = setTimeout(hide, moveTime * 3 + 100);
}

function move() {
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  $cat.style.transform = `translate(${x}px, ${y}px)`;
  moveTimerID = setTimeout(move, moveTime);
}

function show() {
  $cat.classList.add('cat__show');
}

function hide() {
  stop();
  runTimerID = setTimeout(run, moveTime * 2);
}

function stop() {
  $cat.classList.remove('cat__show');

  clearTimeout(moveTimerID);
  clearTimeout(showTimerID);
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
  $catIcon.style.animationName = 'cat-icon-flip';
  $toBad.style.animationName = 'cat-to-bad';

  setTimeout(toBadEnd, 1400); // анимация
}

function toBadEnd() {
  $body.classList.remove('dont-shoot');
  $catIcon.style.animationName = '';
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
  stop();
  $cat.remove();
}

document.addEventListener('startGame', run);
document.addEventListener('catShoot', shoot);
document.addEventListener('waveEnd', stop);
document.addEventListener('waveStart', run);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);
