const
  $body = document.querySelector('body'),
  $event = document.querySelector('.event'),
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let eventShoot = new Event('shoot');

function shoot(e) {
  const
    target = e.target,
    x = e.pageX,
    y = e.pageY;

  /** GOD MOD */
  if (!window.god) {
    eventShoot.shoot = {x, y};
    /** выстрелы без перезарядки и бессмертие */
    $event.dispatchEvent(eventShoot);
  }

  // $event.dispatchEvent(new Event('damage'));

  /** нельзя стрелять */
  if ($body.classList.contains('dont-shoot')) {
    return;
  }

  /** выстрел по убитому врагу */
  if (target.classList.contains('enemy-kill')) {
    return;
  }

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    $event.dispatchEvent(eventEnemyKill);
    return;
  }

  /** выстрел по котику :( */
  if (target.classList.contains('cat')) {
    $event.dispatchEvent(eventCatShoot);
  }
}

function gameOver() {
  window.removeEventListener('click', shoot);
}

$event.addEventListener('gameOver', gameOver);

export default shoot;
