import noise from './../helper/noise';

const
  $body = document.body,
  $revolverWrap = $body.querySelector('.revolver-wrap'),
  $drum = $revolverWrap.querySelector('.drum'),
  $bullets = $drum.querySelectorAll('.bullet'),
  $drumCount = $revolverWrap.querySelector('.drum-count'),
  $shoot = $body.querySelector('.shoot'),
  bulletDrum = 6,
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  audioShoots = [
    audioSprite.shoot1,
    audioSprite.shoot2,
    audioSprite.shoot3,
    audioSprite.shoot4
  ],
  audioReload = audioSprite.reload;

let
  discardedBullet = 0, // пули, которые были выброшены (при перезарядке, оставшиеся пули)
  drumReloadCount = 0,
  bulletCurrent = 0, // текущая пуля для выстрела в барабане
  drumCount = 5, // барабанов для перезарядки
  isDrumRotate = false;

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

  discardedBullet += bulletDrum - bulletCurrent;
  bulletCurrent = 0;

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 700);

  drumReloadCount += 1;
}

function holeReload() {
  for (let i = 0; i < bulletDrum; i++) {
    $bullets[i].classList.remove('hide');
  }
}

function drumCountAdd(e) {
  drumCount += e.add;
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

function startGame() {
  document.addEventListener('shoot', shoot);
  document.addEventListener('keyup', RKeyHandler);
  document.addEventListener('contextmenu', drumReloadHandler);
  $revolverWrap.addEventListener('click', drumRotate);
}

function gameOver() {
  document.removeEventListener('shoot', shoot);
  document.removeEventListener('keyup', RKeyHandler);
  document.removeEventListener('contextmenu', drumReloadHandler);
  $revolverWrap.removeEventListener('click', drumRotate);

  discardedBulletStatistic();
  drumReloadCountStatistic();
}

function discardedBulletStatistic() {
  let discardedBulletEvent = new Event('discardedBullet');
  discardedBulletEvent.discardedBullet = discardedBullet;

  document.dispatchEvent(discardedBulletEvent);
}

function drumReloadCountStatistic() {
  let drumReloadCountEvent = new Event('drumReloadCount');
  drumReloadCountEvent.drumReloadCount = drumReloadCount;

  document.dispatchEvent(drumReloadCountEvent);
}

document.addEventListener('startGame', startGame);
document.addEventListener('buyDrum', drumCountAdd);
document.addEventListener('gameOver', gameOver);
