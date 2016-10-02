import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $revolver = $body.querySelector('.revolver'),
  $drum = $revolver.querySelector('.drum'),
  $ammunition = $revolver.querySelector('.ammunition'),
  $shoot = $body.querySelector('.revolver-shoot'),
  $event = $body.querySelector('.event'),
  $bullets = $drum.children,
  ammunitionFull = 30,
  bulletFull = 6,
  audioSprite = window.audioSprite,
  audioSpriteJson = window.audioSpriteJson,
  audioShoot = audioSpriteJson.shoot,
  audioIdle = audioSpriteJson.idle,
  audioReload = audioSpriteJson.reload;

let
  bulletCount = 0, // текущая пуля для выстрела в барабане из 6
  ammunitionCount = ammunitionFull,
  restDrum = bulletFull, // остаток в барабане
  isDrumRotate = false;

function shoot(e) {
  /** пули закончились в абойме или
   * нельзя стрелять */
  if (
    bulletCount >= restDrum ||
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
  $bullets[bulletCount].style.opacity = 0;
  bulletCount += 1;
  $drum.style.transform = `rotate(-${bulletCount * 60}deg)`;
}

function drumRotate() {
  /** барабан перезаряжен или
   * барабан еще крутится или
   * патрон для перезарядки нет */
  if (
    bulletCount === 0 ||
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
  let
    lastReload = false,
    bulletCountTMP = bulletCount;

  /** если в запасе патрон меньше,
   * чем нужно перезарядить,
   * то перезарядится сколько есть */
  if (bulletCount > ammunitionCount) {
    bulletCount = ammunitionCount;
    lastReload = true;
  }

  ammunitionChange(-bulletCount);

  if (lastReload) {
    hiddenBullets(true);

    /** сколько есть для перезарядки + остаток в барабане */
    bulletCount += bulletFull - bulletCountTMP;
    restDrum = bulletCount;
  }

  hiddenBullets(false);

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 600);

  bulletCount = 0;
}

function ammunitionChange(change) {
  ammunitionCount += change;
  $ammunition.textContent = ammunitionCount;
}

function hiddenBullets(visible) {
  let hidden = 1;

  if (visible) {
    hidden = 0;
  }

  for (let i = 0, len = bulletFull; i < len; i++) {
    $bullets[i].style.opacity = hidden;
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
