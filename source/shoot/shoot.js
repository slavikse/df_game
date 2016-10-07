import debounce from 'libs/debounce';

const
  $body = document.body,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill'),
  rate = 167,
  shootFire = debounce(shoot, rate);

let eventShoot = new CustomEvent('shoot');

function shoot(e) {
  const
    target = e.target,
    x = e.pageX,
    y = e.pageY;

  eventShoot.shoot = {x, y};
  document.dispatchEvent(eventShoot);

  // $event.dispatchEvent(new Event('damage'));

  /** выстрел только по левой кнопке мыши или
   * выстрелы временно заблокированы */
  if (
    e.which !== 1 ||
    $body.classList.contains('dont-shoot')
  ) {
    return;
  }

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

function startShoot() {
  document.addEventListener('click', shootFire);
}

function stopShoot() {
  document.removeEventListener('click', shootFire);
}

document.addEventListener('startGame', startShoot);
document.addEventListener('waveEnd', stopShoot);
document.addEventListener('closeShop', startShoot);
document.addEventListener('gameOver', stopShoot);
