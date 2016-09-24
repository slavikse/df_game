import range from 'libs/range';
import noise from './../helper/noise';

const
  $enemyPosition = document.querySelector('.enemy-position'),
  $event = document.querySelector('.event'),
  $temp = document.querySelector('.temp'),
  $enemyCount = document.querySelector('.enemy-count'),
  enemyCloneCount = 5,
  imagesClasses = [
    'icon-monster1',
    'icon-monster2',
    'icon-monster3',
    'icon-monster4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  dieSoundsURI = [ // пути до звуков смерти монстров
    'audio/monster_die1.mp3',
    'audio/monster_die2.mp3',
    'audio/monster_die3.mp3',
    'audio/monster_die4.mp3'
  ],
  width = window.innerWidth - 150,
  height = window.innerHeight - 150 - 100, // 150 - размеры моделек монстров, 100 - под скорбоард;
  eventScore = new CustomEvent('scoreChange', {detail: {increment: +5}}),
  eventDamage = new Event('damage');

let
  enemyCount = 0, // текущее кол-во монстров на игровом поле
  enemyDamageTimer = null;

function loopCloneEnemy() {
  setInterval(cloneEnemy, 5000);
}

function cloneEnemy() {
  let fragment = document.createDocumentFragment();

  for (let i = 0, len = enemyCloneCount; i < len; i++) {
    let clone = $enemyPosition.cloneNode(true);
    setPosition(clone);
    setImage(clone);
    setDamage(clone);
    fragment.appendChild(clone);
  }

  enemyCountChange(enemyCloneCount);

  requestAnimationFrame(() => {
    $temp.appendChild(fragment);
  });
}

function setPosition(clone) {
  const
    x = range(0, width),
    y = range(0, height);

  clone.style.transform = `translate(${x}px, ${y}px)`;
}

function setImage(clone) {
  const random = range(0, imagesClassesLength);
  clone.children[0].classList.add(imagesClasses[random]);
}

function setDamage(clone) {
  const timerDamage = range(10, 18);
  clone.children[1].style.animationDuration = `${timerDamage}s`;

  /** enemy сохраняет таймер */
  clone.children[0].enemyDamageTimer = setTimeout(() => {
    $event.dispatchEvent(eventDamage);
  }, timerDamage * 1000);
}

function enemyShoot(enemy) {
  removeDamage(enemy);
  enemy.classList.add('enemy-shoot', 'is-kill');
  enemy.style.animationName = 'enemy-flip';
  enemyCountChange(-1);

  setTimeout(() => {
    requestAnimationFrame(() => {
      enemy.remove();
    });
  }, 400); // 50% от времени анимации
}

function removeDamage(enemy) {
  clearTimeout(enemy.enemyDamageTimer);
  enemy.nextElementSibling.remove(); // полоска урона
}

function enemyCountChange(change) {
  requestAnimationFrame(() => {
    enemyCount += change;
    $enemyCount.textContent = enemyCount;
  });
}

$event.addEventListener('enemyShoot', detail => {
  noise(dieSoundsURI);
  enemyShoot(detail.enemy.target);

  $event.dispatchEvent(eventScore);
});

/** выстрел по котику вызывает волну монстров */
$event.addEventListener('enemyCreate', () => {
  cloneEnemy();
});

export default loopCloneEnemy;
