import noise from './../helper/noise';

const
  $body = document.body,
  $revolver = $body.querySelector('.revolver'),
  $drum = $revolver.querySelector('.drum'),
  $bullets = $drum.children,
  $ammunition = $revolver.querySelector('.ammunition'),
  $shoot = $body.querySelector('.revolver-shoot'),
  ammunitionFull = 20,
  bulletsFull = 6,
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  audioShoot = audioSprite.shoot,
  audioIdle = audioSprite.idle,
  audioReload = audioSprite.reload;

let
  bulletsNeedReload = 0, // текущая пуля для выстрела в барабане из 6
  ammunitionCount = ammunitionFull, // количество пуль в запаснике
  isDrumRotate = false,
  /** будет равняться bulletsFull, когда пуль много и остатку в барабане, когда мало */
  bulletsAvailableInDrum = bulletsFull;

$ammunition.textContent = ammunitionFull;

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
  if (bulletsNeedReload === bulletsAvailableInDrum) {
    $body.classList.add('dont-shoot');
  }
}

function shootPositionChange(x, y) {
  $shoot.style.opacity = 1;
  $shoot.style.transform = `translate(${x}px, ${y}px)`;

  setTimeout(() => {
    $shoot.style.opacity = 0;
  }, 60);
}

function drumTurn() {
  $bullets[bulletsNeedReload].style.opacity = 0;
  bulletsNeedReload += 1;
  $drum.style.transform = `rotate(-${bulletsNeedReload * 60}deg)`;
}

/** перезарядка */
function drumRotate() {
  /** барабан перезаряжен или
   * барабан еще крутится или
   * патрон для перезарядки нет */
  if (
    bulletsNeedReload === 0 ||
    isDrumRotate ||
    ammunitionCount === 0
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
  littleBullets();
  ammunitionDec();
  bulletsReload();

  bulletsNeedReload = bulletsFull - bulletsAvailableInDrum;

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 700);
}

/**TODO пуль 6. отсчет начинает с [0-5] */

/** если в запаснике пуль меньше, чем нужно перезарядить,
 * то перезарядится сколько есть + остаток в барабане */
function littleBullets() {

  console.log(bulletsNeedReload, ammunitionCount);

  if (bulletsNeedReload > ammunitionCount) {
    const restBullets = bulletsFull - bulletsNeedReload;

    bulletsNeedReload = ammunitionCount + restBullets;
    bulletsAvailableInDrum = bulletsNeedReload;
    bulletsHidden();
  }

  return bulletsNeedReload;
}

function bulletsHidden() {
  for (let i = 0, len = bulletsFull; i < len; i++) {
    $bullets[i].style.opacity = 0;
  }
}

function bulletsReload() {
  for (let i = 0; i < bulletsNeedReload; i++) {
    $bullets[i].style.opacity = 1;
  }
}

function ammunitionAdd(e) {
  const add = e.add;

  bulletsAvailableInDrum += add;

  if (bulletsAvailableInDrum > bulletsFull) {
    bulletsAvailableInDrum = bulletsFull;
  }

  ammunitionCount += add;
  ammunitionChange(ammunitionCount);
}

function ammunitionDec() {
  ammunitionCount -= bulletsNeedReload;

  if (ammunitionCount < 0) {
    ammunitionCount = 0;
  }

  ammunitionChange(ammunitionCount);
}

function ammunitionChange(ammunitionCount) {
  $ammunition.textContent = ammunitionCount;
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

function contextmenu(e) {
  e.preventDefault();
  drumRotate();
}

function startGame() {
  document.addEventListener('shoot', shoot);
  document.addEventListener('keyup', RKeyHandler);
  document.addEventListener('contextmenu', contextmenu);
  $revolver.addEventListener('click', drumRotate);
  document.addEventListener('buyBullets', ammunitionAdd);
  document.addEventListener('gameOver', gameOver);
}

function gameOver() {
  document.removeEventListener('shoot', shoot);
  document.removeEventListener('keyup', RKeyHandler);
  document.removeEventListener('contextmenu', contextmenu);
  document.removeEventListener('buyBullets', ammunitionAdd);
  $revolver.removeEventListener('click', drumRotate);
  document.removeEventListener('gameOver', gameOver);
}

document.addEventListener('startGame', startGame);

