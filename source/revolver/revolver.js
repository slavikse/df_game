import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $revolver = $body.querySelector('.revolver'),
  $drum = $revolver.querySelector('.drum'),
  $event = $body.querySelector('.event'),
  $bullets = $drum.children,
  bulletFull = 6,
  reloadSoundURI = ['audio/reload.mp3'],
  emptySoundsURI = [];

let
  bulletCount = 0,
  bulletReloadCurrent = 0,
  isDrumRotate = false,
  reloadIntervalID = null;

function shoot() {
  /** пули закончились
   * или нельзя стрелять */
  if (bulletCount >= bulletFull || $body.classList.contains('dont-shoot')) {
    $body.classList.add('dont-shoot');
    noise('audio/idle.mp3');
    return;
  }

  drumTurn();
}

function drumTurn() {
  $bullets[bulletCount].style.opacity = 0;
  bulletCount += 1;
  $drum.style.transform = `rotate(-${bulletCount * 60}deg)`; // поворот барабана при выстреле
}

function drumRotate() {
  if (isDrumRotate) {
    return;
  }

  isDrumRotate = true;
  noise(reloadSoundURI);

  $body.classList.add('dont-shoot');
  $drum.classList.add('drum-rotate');

  drumReload();
}

function drumReload() {
  bulletCount = 0;
  bulletReloadCurrent = bulletFull - 1;
  reloadIntervalID = setInterval(bulletReload, 100);
}

function bulletReload() {
  $bullets[bulletReloadCurrent].style.opacity = 1;
  bulletReloadCurrent -= 1;

  if (bulletReloadCurrent < 0) {
    reloaded();
  }
}

function reloaded() {
  clearInterval(reloadIntervalID);
  isDrumRotate = false;

  $body.classList.remove('dont-shoot');
  $drum.classList.remove('drum-rotate');

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
