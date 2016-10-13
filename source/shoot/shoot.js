import debounce from 'libs/debounce';
import noise from './../helper/noise';

const
  $body = document.body,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill'),
  shootFire = debounce(shoot, 167), // fire rate
  audioURI = window.audioURI,
  audioIdle = window.audioSprite.idle;

let eventShoot = new CustomEvent('shoot');

function shoot(e) {
  /** выстрел только по левой кнопке мыши или
   * враг убит или
   * выстрелы временно заблокированы */
  if (
    e.which !== 1 ||
    e.target.classList.contains('enemy-kill') ||
    $body.classList.contains('dont-shoot')
  ) {
    noise(audioURI, audioIdle);
    return;
  }

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
  document.addEventListener('click', shootFire);
}

function shootingEnd() {
  document.removeEventListener('click', shootFire);
}

document.addEventListener('startGame', shooting);
document.addEventListener('waveEnd', shootingEnd);
document.addEventListener('waveStart', shooting);
document.addEventListener('gameOver', shootingEnd);
