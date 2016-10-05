const
  $body = document.body,
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new Event('enemyKill');

let eventShoot = new CustomEvent('shoot');

function shoot(e) {
  const
    target = e.target,
    x = e.pageX,
    y = e.pageY;

  eventShoot.shoot = {x, y};
  document.dispatchEvent(eventShoot);

  // $event.dispatchEvent(new Event('damage'));

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
    document.dispatchEvent(eventEnemyKill);
  } else

  /** выстрел по котику */
  if (target.classList.contains('cat')) {
    document.dispatchEvent(eventCatShoot);
  }
}

function gameOver() {
  document.removeEventListener('click', shoot);
}

document.addEventListener('gameOver', gameOver);

export default shoot;
