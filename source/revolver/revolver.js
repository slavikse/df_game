import noise from './../helper/noise';

const
  $body = document.body,
  $revolver = $body.querySelector('.revolver'),
  $drum = $revolver.querySelector('.drum'),
  $ammunition = $revolver.querySelector('.ammunition'),
  $shoot = $body.querySelector('.revolver-shoot'),
  $event = $body.querySelector('.event'),
  $bullets = $drum.children,
  ammunitionFull = 99,
  bulletFull = 6,
  audioSprite = window.audioSprite,
  audioSpriteJson = window.audioSpriteJson,
  audioShoot = audioSpriteJson.shoot,
  audioIdle = audioSpriteJson.idle,
  audioReload = audioSpriteJson.reload;

let
  bulletsNeedReload = 0, // текущая пуля для выстрела в барабане из 6
  ammunitionCount = ammunitionFull,
  restDrum = bulletFull, // остаток в барабане
  isDrumRotate = false;

$ammunition.textContent = ammunitionFull;

function shoot(e) {
  /** пули закончились в абойме или
   * нельзя стрелять */
  if (
    bulletsNeedReload >= restDrum ||
    $body.classList.contains('dont-shoot')
  ) {
    $body.classList.add('dont-shoot');
    noise(audioSprite, audioIdle);
    return;
  }

  noise(audioSprite, audioShoot);
  shootPositionChange(e.shoot.x, e.shoot.y);

  /** GOD MOD */
  if (window.god) {
    return;
  }

  drumTurn();
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

function drumRotate() {
  /** барабан перезаряжен или
   * барабан еще крутится или
   * патрон для перезарядки нет */
  if (
    bulletsNeedReload === 0 ||
    isDrumRotate ||
    ammunitionCount <= 0
  ) {
    noise(audioSprite, audioIdle);
    return;
  }

  $body.classList.add('dont-shoot');
  $drum.style.animationName = 'drum-rotate';

  isDrumRotate = true;
  noise(audioSprite, audioReload);

  drumReload();
}

function drumReload() {
  /** если в запасе патрон меньше,
   * чем нужно перезарядить,
   * то перезарядится сколько есть */
  if (bulletsNeedReload > ammunitionCount) {
    /** сколько есть для перезарядки + остаток в барабане */
    bulletsNeedReload = bulletFull - bulletsNeedReload + ammunitionCount;
    restDrum = bulletsNeedReload;

    bulletsHidden();
    ammunitionChange(-ammunitionCount);
  } else {
    ammunitionChange(-bulletsNeedReload);
  }

  bulletsReload(bulletsNeedReload);

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 600);

  bulletsNeedReload = 0;
}

function ammunitionChange(change) {
  ammunitionCount += change;
  $ammunition.textContent = ammunitionCount;
}

function bulletsReload(reloadBullet) {
  for (let i = 0, len = reloadBullet; i < len; i++) {
    $bullets[i].style.opacity = 1;
  }
}

function bulletsHidden() {
  for (let i = 0, len = bulletFull; i < len; i++) {
    $bullets[i].style.opacity = 0;
  }
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

$event.addEventListener('shoot', shoot);
window.addEventListener('keyup', RKeyHandler);
$revolver.addEventListener('click', drumRotate);
