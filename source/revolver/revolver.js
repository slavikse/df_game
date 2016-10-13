import noise from './../helper/noise';

const
  $body = document.body,
  $revolverWrap = $body.querySelector('.revolver-wrap'),
  $drum = $revolverWrap.querySelector('.drum'),
  $holes = $drum.querySelectorAll('.hole'),
  $drumCount = $revolverWrap.querySelector('.drum-count'),
  $shoot = $body.querySelector('.shoot'),
  holeDrum = 6,
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  audioShoot = audioSprite.shoot,
  audioIdle = audioSprite.idle,
  audioReload = audioSprite.reload;

let
  holeCurrent = 0, // текущая пуля для выстрела в барабане
  drumCount = 3, // барабанов для перезарядки
  isDrumRotate = false;

drumCountChange(drumCount);

function shoot(e) {
  noise(audioURI, audioShoot);
  shootPositionChange(e.shoot.x, e.shoot.y);

  /** GOD MOD */

  if (window.god) {
    return;
  }

  /** / GOD MOD */

  drumTurn();

  /** пули в барабане закончились */
  if (holeCurrent === holeDrum) {
    $body.classList.add('dont-shoot');
  }
}

function shootPositionChange(x, y) {
  $shoot.style.transform = `translate(${x}px, ${y}px)`;
  $shoot.classList.add('shoot-visible');

  setTimeout(shootHide, 60);
}

function shootHide() {
  $shoot.classList.remove('shoot-visible');
}

function drumTurn() {
  $holes[holeCurrent].classList.add('hide');
  holeCurrent += 1;
  $drum.style.transform = `rotate(-${holeCurrent * 60}deg)`;
}

/** Перезарядка */

function drumRotate() {
  /**
   * перезаряжен
   * перезаряжается
   * кончились
   */
  if (
    holeCurrent === 0 ||
    isDrumRotate ||
    drumCount === 0
  ) {
    noise(audioURI, audioIdle);
    return;
  }

  $body.classList.add('dont-shoot');
  isDrumRotate = true;
  $drum.style.animationName = 'drum-rotate';
  noise(audioURI, audioReload);

  drumReload();
}

function drumReload() {
  holeReload();
  drumCountDec();
  holeCurrent = 0;

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 700);
}

function holeReload() {
  for (let i = 0; i < holeDrum; i++) {
    $holes[i].classList.remove('hide');
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

  $body.classList.remove('dont-shoot');
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
  document.addEventListener('buyDrum', drumCountAdd);
  document.addEventListener('gameOver', gameOver);
}

function gameOver() {
  document.removeEventListener('shoot', shoot);
  document.removeEventListener('keyup', RKeyHandler);
  document.removeEventListener('contextmenu', drumReloadHandler);
  $revolverWrap.removeEventListener('click', drumRotate);
}

document.addEventListener('startGame', startGame);
