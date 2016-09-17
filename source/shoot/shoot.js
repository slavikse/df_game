import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $temp = document.querySelector('.temp'),
  $event = document.querySelector('.event'),
  imagesURI = [ // путь до модельки огня от выстрела
    'image/shootfire32.png'
  ],
  soundsURI = [ // пути до звуков выстрелов
    'audio/shoot1.mp3',
    'audio/shoot2.mp3',
    'audio/shoot3.mp3',
    'audio/shoot4.mp3',
    'audio/shoot5.mp3',
    'audio/shoot6.mp3'
  ],
  eventShoot = new Event('shoot'),
  eventCatShoot = new Event('catShoot'),
  eventEnemyShoot = new CustomEvent('enemyShoot');

function shoot(e) {
  let target = e.target;

  /** TODO GOD */
  if (!window.god) {
    /** револьвер */
    $event.dispatchEvent(eventShoot);
  }

  /** нельзя стрелять */
  if ($body.classList.contains('dont-shoot')) {
    return;
  }

  /**
   * health api
   */

  // let eventGamage = new Event('damage');
  // $event.dispatchEvent(eventGamage);

  /**
   * / health api
   */


  createShoot(e.pageX, e.pageY);
  noise(soundsURI);

  /** выстрел по монстру */
  if (target.classList.contains('enemy')) {
    eventEnemyShoot.enemy = e;
    $event.dispatchEvent(eventEnemyShoot);
    return;
  }

  /** выстрел по убитому врагу */
  if (target.classList.contains('is-kill')) {
    return;
  }

  /** выстрел по котику :( */
  if (target.classList.contains('cat')) {
    $event.dispatchEvent(eventCatShoot);
    return;
  }
}

function createShoot(x, y) {
  let shoot = createShootElement(x, y);

  requestAnimationFrame(() => {
    $temp.appendChild(shoot);
  });

  setTimeout(() => {
    requestAnimationFrame(() => {
      shoot.remove();
    });
  }, 100);
}

function createShootElement(x, y) {
  let shoot = document.createElement('img');
  shoot.classList.add('shoot');
  shoot.style.top = `${y}px`;
  shoot.style.left = `${x}px`;
  shoot.src = imagesURI[0];
  shoot.draggable = false;

  return shoot;
}

window.addEventListener('click', shoot);
