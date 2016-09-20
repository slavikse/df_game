import supportCSS from 'libs/support_css';
import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $drum = document.querySelector('.drum'),
  $event = document.querySelector('.event'),
  $reload = document.querySelector('.reload'),
  bullets = $drum.children,
  bulletFull = 6,
  reloadSoundURI = [ // путь до звука перезарядки барабана
    'audio/reload.mp3'
  ],
  emptySoundsURI = [ // путь до звука щелчка при пустом барабане
    'audio/idle.mp3'
  ],
  supportTransform = supportCSS('transform');

let
  bulletCount = 0,
  bulletReloadCurrent = 0,
  isDrumRotate = false,
  reloadIntervalID = null;

function shoot() {
  /** пули закончились
   * или нельзя стрелять */
  if (
    bulletCount >= bulletFull ||
    $body.classList.contains('dont-shoot')
  ) {
    $body.classList.add('dont-shoot'); // ставит класс повторно, если стрелять нельзя
    noise(emptySoundsURI);
    return;
  }

  drumTurn();
}

/** поворот барабана при выстреле */
function drumTurn() {
  bullets[bulletCount].style.opacity = 0; // скрывает пулю в барабане
  bulletCount += 1;
  $drum.style[supportTransform] = `rotate(-${bulletCount * 60}deg)`;
}

function drumRotate() {
  if (isDrumRotate) {
    return;
  }

  isDrumRotate = true;
  noise(reloadSoundURI);

  $drum.classList.add('drum-rotate');
  $body.classList.add('dont-shoot');

  drumReload();
}

function drumReload() {
  bulletCount = 0;
  bulletReloadCurrent = bulletFull - 1;
  reloadIntervalID = setInterval(bulletReload, 100);
}

function bulletReload() {
  bullets[bulletReloadCurrent].style.opacity = 1;
  bulletReloadCurrent -= 1;

  if (bulletReloadCurrent < 0) {
    reloaded();
  }
}

function reloaded() {
  clearInterval(reloadIntervalID);
  isDrumRotate = false;

  $drum.classList.remove('drum-rotate');
  $body.classList.remove('dont-shoot');

  $drum.style[supportTransform] = 'rotate(0deg)';
}

function RKeyHandler(e) {
  if (e.keyCode === 82) { // R
    drumRotate();
  }
}

$event.addEventListener('shoot', shoot);
window.addEventListener('keyup', RKeyHandler);
$reload.addEventListener('click', drumRotate);
