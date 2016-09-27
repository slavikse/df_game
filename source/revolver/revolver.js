import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $revolver = $body.querySelector('.revolver'),
  $drum = $revolver.querySelector('.drum'),
  $ammunition = $revolver.querySelector('.ammunition'),
  $shoot = $body.querySelector('.revolver-shoot'),
  $event = $body.querySelector('.event'),
  $bullets = $drum.children,
  ammunitionFull = 14,
  bulletFull = 6;

let
  bulletCount = 0,
  ammunitionCount = ammunitionFull,
  restDrum = bulletFull, // остаток в барабане
  isDrumRotate = false;

function shoot(e) {
  /** пули закончились в абойме
   * или нельзя стрелять */
  if (
    bulletCount >= bulletFull ||
    bulletCount >= restDrum ||
    $body.classList.contains('dont-shoot')
  ) {
    $body.classList.add('dont-shoot');
    noise('audio/idle.mp3');
    return;
  }

  noise('audio/shoot.mp3');
  shootPositionChange(e.shoot.x, e.shoot.y);
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
  /** барабан еще крутится
   * патрон для перезарядки нет */
  if (
    isDrumRotate ||
    ammunitionCount <= 0
  ) {
    return;
  }

  isDrumRotate = true;
  noise('audio/reload.mp3');

  $body.classList.add('dont-shoot');
  $drum.style.animationName = 'drum-rotate';

  drumReload();
}

function drumReload() {
  let
    lastReload = false,
    bulletCountTMP = bulletCount;

  /** если в запасе патрон меньше, чем нужно перезарядить, то перезарядится сколько есть */
  if (bulletCount > ammunitionCount) {
    bulletCount = ammunitionCount;
    lastReload = true;
  }

  ammunitionChange(-bulletCount);

  if (lastReload) {
    resetDrum();
    bulletCount += bulletFull - bulletCountTMP; // остаток в абойме
    restDrum = bulletCount;
  }

  /** синхронизация со звуком перезарядки и анимацией */
  setTimeout(reloaded, 600);

  /** перезарядит только выстреленные */
  for (let i = 0, len = bulletCount; i < len; i++) {
    $bullets[i].style.opacity = 1;
  }

  bulletCount = 0;
}

function ammunitionChange(change) {
  ammunitionCount += change;
  $ammunition.textContent = ammunitionCount;
}

function reloaded() {
  isDrumRotate = false;

  $body.classList.remove('dont-shoot');
  $drum.style.animationName = '';
  $drum.style.transform = 'rotate(0deg)';
}

function resetDrum() {
  for (let i = 0, len = bulletFull; i < len; i++) {
    $bullets[i].style.opacity = 0;
  }
}

function RKeyHandler(e) {
  if (e.keyCode === 82) {
    drumRotate();
  }
}

$event.addEventListener('shoot', shoot);
window.addEventListener('keyup', RKeyHandler);
$revolver.addEventListener('click', drumRotate);
