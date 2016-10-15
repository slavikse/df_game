import debounce from 'libs/debounce';
import noise from './../helper/noise';

const
  $body = document.body,
  fireRate = 167,
  shootFire = debounce(shoot, fireRate),
  audioURI = window.audioURI,
  audioIdle = window.audioSprite.idle,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let
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
    x = e.pageX,
    y = e.pageY;

  eventShoot.shoot = {x, y};
  document.dispatchEvent(eventShoot);

  // $event.dispatchEvent(new Event('damage'));

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    document.dispatchEvent(eventEnemyKill);
  } else

  /** выстрел по котику */
  if (target.classList.contains('cat')) {
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
  shootFire(e);
}

function shootingStop() {
  document.removeEventListener('mousemove', shootAutoFireMove);
  clearTimeout(shootFireAutoTimerID);
}

function noShooting() {
  document.removeEventListener('mousedown', shootAutoFireDown);
  document.removeEventListener('mouseup', shootingStop);
}

document.addEventListener('startGame', shooting);
document.addEventListener('waveEnd', noShooting);
document.addEventListener('waveStart', shooting);
document.addEventListener('gameOver', noShooting);

/**TODO при остановке движения, продолжать стрелять */
