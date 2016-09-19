import range from 'libs/range';
import noise from './../helper/noise';

const
  $event = document.querySelector('.event'),
  $temp = document.querySelector('.temp'),
  $enemyCount = document.querySelector('.enemy-count'),
  enemyCreateCount = 5,
  imagesURI = [ // пути до моделей монстров
    'image/monster1.png',
    'image/monster2.png',
    'image/monster3.png',
    'image/monster4.png'
  ],
  bloodsURI = [ // пути до моделей крови
    'image/blood1.png',
    'image/blood2.png'
  ],
  dieSoundsURI = [ // пути до звуков смерти монстров
    'audio/monster_die1.mp3',
    'audio/monster_die2.mp3',
    'audio/monster_die3.mp3',
    'audio/monster_die4.mp3'
  ],
  eventScore = new CustomEvent('scoreChange', {
    detail: {increment: +5}
  });

let enemyCount = 0; // текущее кол-во монстров на игровом поле

function loopCreateEnemy() {
  setInterval(createEnemy, 5000);
}

function createEnemy() {
  let fragment = document.createDocumentFragment();

  for (let i = 0, len = enemyCreateCount; i < len; i++) {
    let enemy = createEnemyElement();
    fragment.appendChild(enemy);
  }

  enemyCountChange(+enemyCreateCount);

  requestAnimationFrame(() => {
    $temp.appendChild(fragment);
  });
}

function createEnemyElement() {
  let
    enemy = document.createElement('img'),
    random = range(0, imagesURI.length - 1),
    x = range(0, window.innerWidth - 120),
    y = range(0, window.innerHeight - 120 - 100); // 120 - размеры моделек монстров, 100 - под скорбоард

  enemy.classList.add('enemy');
  enemy.style.top = `${y}px`;
  enemy.style.left = `${x}px`;
  enemy.src = imagesURI[random];
  enemy.draggable = false;

  return enemy;
}

function enemyKill(enemy) {
  enemy.classList.add('enemy-shoot', 'is-kill');
  enemyCountChange(-1);

  setTimeout(() => {
    requestAnimationFrame(() => {
      enemy.remove();
    })
  }, 100);
}

function createBlood(enemy) {
  let blood = createBloodElement(enemy);

  requestAnimationFrame(() => {
    $temp.appendChild(blood);
  });

  setTimeout(() => {
    requestAnimationFrame(() => {
      blood.remove();
    })
  }, 100);
}

function createBloodElement(enemy) {
  let
    blood = document.createElement('img'),
    random = range(0, bloodsURI.length - 1),
    x = enemy.pageX,
    y = enemy.pageY;

  blood.classList.add('enemy-blood');
  blood.style.top = `${y}px`;
  blood.style.left = `${x}px`;
  blood.src = bloodsURI[random];
  blood.draggable = false;

  return blood;
}

function enemyCountChange(change) {
  enemyCount += change;

  requestAnimationFrame(() => {
    $enemyCount.textContent = enemyCount;
  });
}

$event.addEventListener('enemyShoot', detail => {
  let enemy = detail.enemy;

  noise(dieSoundsURI);
  enemyKill(enemy.target);
  createBlood(enemy);

  $event.dispatchEvent(eventScore);
});

/** выстрел по котику вызывает волну монстров */
$event.addEventListener('enemyCreate', () => {
  createEnemy();
});

export default loopCreateEnemy;
