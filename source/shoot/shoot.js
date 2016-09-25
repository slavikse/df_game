import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $temp = document.querySelector('.temp'),
  $event = document.querySelector('.event'),
  eventShoot = new Event('shoot'),
  eventCatShoot = new Event('catShoot'),
  eventEnemyKill = new CustomEvent('enemyKill');

function shoot(e) {
  let target = e.target;

  /** GOD MOD */
  if (!window.god) {
    /** слушает револьвер */
    $event.dispatchEvent(eventShoot);
  }

  // $event.dispatchEvent(new CustomEvent('damage'));

  /** нельзя стрелять */
  if ($body.classList.contains('dont-shoot')) {
    return;
  }

  createShoot(e.pageX, e.pageY);
  noise('audio/shoot.mp3');

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyKill.enemy = e;
    $event.dispatchEvent(eventEnemyKill);
    return;
  }

  /** выстрел по убитому врагу */
  if (target.classList.contains('is-kill')) {
    return;
  }

  /** выстрел по котику :( */
  if (target.classList.contains('cat')) {
    $event.dispatchEvent(eventCatShoot); // слушает котик
  }
}

function createShoot(x, y) {
  let shoot = createShootElement(x, y);

  $temp.appendChild(shoot);

  setTimeout(() => {
    shoot.remove();
  }, 60);
}

/*TODO в dom  и перемещать как котю. поместить в спрайт и в bgi */
function createShootElement(x, y) {
  let shoot = document.createElement('img');
  shoot.classList.add('shoot');
  shoot.style.top = `${y}px`;
  shoot.style.left = `${x}px`;
  shoot.src = 'image/shootfire32.png';
  shoot.draggable = false;

  return shoot;
}

function stopShoot() {
  window.removeEventListener('click', shoot);
}

$event.addEventListener('stopGame', stopShoot);

export default shoot;
