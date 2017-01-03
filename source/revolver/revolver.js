import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $body = document.body;
const $revolver = $body.querySelector('.revolver');
const $iconRevolver = $body.querySelector('.icon-revolver');
const $drum = $revolver.querySelector('.revolver__drum');
const $bullets = $drum.querySelectorAll('.revolver__bullet');
const $drumCount = $revolver.querySelector('.revolver__drum-count');
const bulletDrum = 6;
const audioShoots = [
  audioSprite.revolver_shoot1,
  audioSprite.revolver_shoot2,
  audioSprite.revolver_shoot3,
  audioSprite.revolver_shoot4
];
const audioReload = audioSprite.revolver_reload;

let discardedBulletStat = 0;
let drumReloadCountStat = 0;
let bulletCurrent = 0;
let drumCount = 3;
let isDrumRotate = false;

function authBonus() {
  drumCount += 1;
}

function shoot() {
  noise(audioURI, audioShoots);

  /** GOD MOD */

  if (window.god) {
    return;
  }

  /** / GOD MOD */

  drumTurn();
}

function drumTurn() {
  $bullets[bulletCurrent].style.opacity = 0;
  bulletCurrent += 1;
  $drum.style.transform = `rotate(-${bulletCurrent * 60}deg)`;

  /** пули в барабане закончились */
  if (bulletCurrent === bulletDrum) {
    $body.classList.add('nothing-shoot');
  }
}

/**
 * барабан полон пуль или
 * не перезаряжается в данный момент или
 * не кончились барабаны для перезарядки
 */
function drumRotate() {
  if (bulletCurrent !== 0 && !isDrumRotate && drumCount !== 0) {
    isDrumRotate = true;
    noise(audioURI, audioReload);

    $body.classList.add('nothing-shoot');
    $drum.style.animationName = 'revolver-drum-rotate';

    drumReload();
  }
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
    $bullets[i].style.opacity = 1;
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
  const discardedBulletEvent = new Event('discardedBullet');
  discardedBulletEvent.discardedBullet = discardedBulletStat;

  document.dispatchEvent(discardedBulletEvent);
}

function drumReloadCountStatistic() {
  const drumReloadCountEvent = new Event('drumReloadCount');
  drumReloadCountEvent.drumReloadCount = drumReloadCountStat;

  document.dispatchEvent(drumReloadCountEvent);
}

function startGame() {
  drumCountChange(drumCount);
  setTimeout(hideIconRevolver, 2000);

  document.addEventListener('shoot', shoot);
  document.addEventListener('contextmenu', drumReloadHandler);
}

function hideIconRevolver() {
  $iconRevolver.style.opacity = 0;
}

function gameOver() {
  document.removeEventListener('shoot', shoot);
  document.removeEventListener('contextmenu', drumReloadHandler);

  discardedBulletStatistic();
  drumReloadCountStatistic();
}

document.addEventListener('authBonus', authBonus);
document.addEventListener('startGame', startGame);
document.addEventListener('buyDrum', drumCountAdd);
document.addEventListener('gameOver', gameOver);
