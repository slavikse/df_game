const
  $body = document.querySelector('body'),
  $event = $body.querySelector('.event'),
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let eventShoot = new Event('shoot');

function shoot(e) {
  const
    target = e.target,
    x = e.pageX,
    y = e.pageY;

  /**
   * TODO курсор надо чуть чуть сдвигать,
   * иначе при выстреле в туже точку,
   * ничего не происходит */
  eventShoot.shoot = {x, y};
  $event.dispatchEvent(eventShoot);

  $event.dispatchEvent(new Event('damage'));

  /** стрелять нельзя или
   * выстрел по убитому врагу */
  if (
    $body.classList.contains('dont-shoot') ||
    target.classList.contains('enemy-kill')
  ) {
  } else

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e.target;
    $event.dispatchEvent(eventEnemyKill);
  } else

  /** выстрел по котику */
  if (target.classList.contains('cat')) {
    $event.dispatchEvent(eventCatShoot);
  }
}

function gameOver() {
  window.removeEventListener('click', shoot);
}

$event.addEventListener('gameOver', gameOver);

export default shoot;
