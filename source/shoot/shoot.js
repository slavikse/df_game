import debounce from 'libs/debounce';
import noise from './../helper/noise';

const
  $body = document.body,
  fireRate = 100,
  shootFire = debounce(shoot, fireRate),
  audioURI = window.audioURI,
  audioIdle = window.audioSprite.idle,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let
  movingGunTimerID = null,
  shootFireAutoTimerID,
  eventShoot = new CustomEvent('shoot');

function shoot(e) {
  /** выстрелы временно заблокированы */
  if ($body.classList.contains('dont-shoot')) {
    noise(audioURI, audioIdle);
    return;

    /** нажата не ЛКМ */
  } else if (e.which !== 1) {
    return;
  }

  shootFireAutoTimerID = setTimeout(shoot.bind(null, e), fireRate);

  const
    target = e.target,
    x = e.clientX,
    y = e.clientY;

  eventShoot.shoot = {x, y};
  document.dispatchEvent(eventShoot);

  // $event.dispatchEvent(new Event('damage'));

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    document.dispatchEvent(eventEnemyKill);

    /** выстрел по котику */
  } else if (target.classList.contains('cat')) {
    document.dispatchEvent(eventCatShoot);
  }
}

function shooting() {
  document.addEventListener('mousedown', shootAutoFireDown);
  document.addEventListener('mouseup', shootingStop);
}

function shootAutoFireDown(e) {
  shootFire(e);
  document.addEventListener('mousemove', shootAutoFireMove);
}

function shootAutoFireMove(e) {
  clearTimeout(shootFireAutoTimerID);
  clearTimeout(movingGunTimerID);

  movingGunTimerID = setTimeout(shootMovingStop.bind(null, e), fireRate);
  shootFire(e);
}

function shootMovingStop(e) {
  clearTimeout(movingGunTimerID);
  shoot(e);
}

function noShooting() {
  document.removeEventListener('mousedown', shootAutoFireDown);
  document.removeEventListener('mouseup', shootingStop);

  shootingStop();
}

function shootingStop() {
  document.removeEventListener('mousemove', shootAutoFireMove);

  clearTimeout(movingGunTimerID);
  clearTimeout(shootFireAutoTimerID);
}

document.addEventListener('startGame', shooting);
document.addEventListener('waveEnd', noShooting);
document.addEventListener('waveStart', shooting);
document.addEventListener('gameOver', noShooting);

/**TODO при остановке движения, продолжать стрелять */
