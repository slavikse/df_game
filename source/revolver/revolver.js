import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $body = document.body;
const $revolverWrap = $body.querySelector('.revolver-wrap');
const $drum = $revolverWrap.querySelector('.drum');
const $bullets = $drum.querySelectorAll('.bullet');
const $drumCount = $revolverWrap.querySelector('.drum-count');
const $shoot = $body.querySelector('.shoot');
const bulletDrum = 6;
const audioShoots = [
  audioSprite.shoot1,
  audioSprite.shoot2,
  audioSprite.shoot3,
  audioSprite.shoot4
];
const audioReload = audioSprite.reload;

let discardedBulletStat = 0;
let drumReloadCountStat = 0;
let bulletCurrent = 0;
let drumCount = 3;
let isDrumRotate = false;

function authBonus() {
  drumCount += 1;
  drumCountChange(drumCount);
}

drumCountChange(drumCount);

function shoot(e) {
  noise(audioURI, audioShoots);
  shootPositionChange(e.shoot.x, e.shoot.y);

  /** GOD MOD */

  if (window.god) {
    return;
  }

  /** / GOD MOD */

  drumTurn();

  /** пули в барабане закончились */
  if (bulletCurrent === bulletDrum) {
    $body.classList.add('nothing-shoot');
  }
}

function shootPositionChange(x, y) {
  $shoot.style.transform = `translate(${x}px, ${y}px)`;
  $shoot.classList.add('shoot-visible');

  setTimeout(shootHide, 40);
}

function shootHide() {
  $shoot.classList.remove('shoot-visible');
}

function drumTurn() {
  $bullets[bulletCurrent].classList.add('hide');
  bulletCurrent += 1;
  $drum.style.transform = `rotate(-${bulletCurrent * 60}deg)`;
}

function drumRotate() {
  /**
   * перезаряжен или
   * перезаряжается или
   * кончились пули
   */
  if (
    bulletCurrent === 0 ||
    isDrumRotate ||
    drumCount === 0
  ) {
    return;
  }

  $body.classList.add('nothing-shoot');
  isDrumRotate = true;
  $drum.style.animationName = 'drum-rotate';
  noise(audioURI, audioReload);

  drumReload();
}

function drumReload() {
  holeReload();
  drumCountDec();

  saveDiscardedBulletStat();
  bulletCurrent = 0;

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 700);
  saveDrumReloadCountStat();
}

function holeReload() {
  for (let i = 0; i < bulletDrum; i++) {
    $bullets[i].classList.remove('hide');
  }
}

function drumCountAdd() {
  drumCount += 1;
  drumCountChange(drumCount);
}

function drumCountDec() {
  drumCount -= 1;
  drumCountChange(drumCount);
}

function drumCountChange(drumCount) {
  $drumCount.textContent = `x${drumCount}`;
}

function reloaded() {
  isDrumRotate = false;

  $body.classList.remove('nothing-shoot');
  $drum.style.animationName = '';
  $drum.style.transform = 'rotate(0deg)';
}

function RKeyHandler(e) {
  if (e.keyCode === 82) {
    drumRotate();
  }
}

function drumReloadHandler(e) {
  e.preventDefault();
  drumRotate();
}

function saveDrumReloadCountStat() {
  drumReloadCountStat += 1;
}

function saveDiscardedBulletStat() {
  discardedBulletStat += bulletDrum - bulletCurrent;
}

function discardedBulletStatistic() {
  let discardedBulletEvent = new Event('discardedBullet');
  discardedBulletEvent.discardedBullet = discardedBulletStat;

  document.dispatchEvent(discardedBulletEvent);
}

function drumReloadCountStatistic() {
  let drumReloadCountEvent = new Event('drumReloadCount');
  drumReloadCountEvent.drumReloadCount = drumReloadCountStat;

  document.dispatchEvent(drumReloadCountEvent);
}

function startGame() {
  document.addEventListener('shoot', shoot);
  document.addEventListener('keyup', RKeyHandler);
  document.addEventListener('contextmenu', drumReloadHandler);
}

function gameOver() {
  document.removeEventListener('shoot', shoot);
  document.removeEventListener('keyup', RKeyHandler);
  document.removeEventListener('contextmenu', drumReloadHandler);

  discardedBulletStatistic();
  drumReloadCountStatistic();
}

document.addEventListener('authBonus', authBonus);
document.addEventListener('startGame', startGame);
document.addEventListener('buyDrum', drumCountAdd);
document.addEventListener('gameOver', gameOver);
