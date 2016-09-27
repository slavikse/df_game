import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

const
  $enemyPosition = document.querySelector('.enemy-position'),
  $event = document.querySelector('.event'),
  $temp = document.querySelector('.temp'),
  enemyCloneCount = 5,
  imagesClasses = [
    'icon-monster1',
    'icon-monster2',
    'icon-monster3',
    'icon-monster4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  dieSoundsURI = [
    'audio/monster_die1.mp3',
    'audio/monster_die2.mp3',
    'audio/monster_die3.mp3',
    'audio/monster_die4.mp3'
  ],
  eventEnemyCountCloneChange = new CustomEvent('enemyCountChange', {detail: {change: enemyCloneCount}}),
  eventEnemyKill = new CustomEvent('enemyCountChange', {detail: {change: -1}}),
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: 5}}),
  eventDamage = new Event('damage');

let
  cloneEnemyInterval = null,
  width = window.innerWidth - 150, // ширина врага
  height = window.innerHeight - 150 - 100; // высота врага и панели;

function loopCloneEnemy() {
  cloneEnemyInterval = setInterval(cloneEnemy, 5000);
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

  $temp.appendChild(fragment);
  $event.dispatchEvent(eventEnemyCountCloneChange);
}

function setPosition(clone) {
  const
    x = range(0, width),
    y = range(0, height);

  clone.style.transform = `translate(${x}px, ${y}px)`;
}

function setDamage(clone) {
  const
    timerDamage = range(6, 10),
    damage = clone.children[0];

  damage.style.animationDuration = `${timerDamage}s`;

  /** enemy сохраняет свой таймер урона для дальнейшего его удаления */
  clone.damageTimer = setTimeout(() => {
    $event.dispatchEvent(eventDamage);
    removeEnemy(clone);
  }, timerDamage * 1000);
}

function setImage(clone) {
  const
    enemy = clone.children[1],
    random = range(0, imagesClassesLength);

  enemy.classList.add(imagesClasses[random]);
}

function removeEnemy(enemyClone) {
  clearTimeout(enemyClone.damageTimer);

  let
    damage = enemyClone.children[0],
    enemy = enemyClone.children[1];

  damage.remove();
  enemy.classList.add('enemy-kill');
  enemyClone.style.zIndex = 0; // для возможности стрелять по тем, кто под убитым

  setTimeout(() => {
    enemyClone.remove();
  }, 500); // анимация. половина от 1s
}

function gameOver() {
  clearInterval(cloneEnemyInterval);
  $temp.remove();
}

$event.addEventListener('enemyKill', e => {
  const enemyClone = e.enemy.parentNode;

  removeEnemy(enemyClone);
  noise(dieSoundsURI);

  $event.dispatchEvent(eventEnemyKill);
  $event.dispatchEvent(eventScoreChange);
});

$event.addEventListener('enemyCreate', () => {
  cloneEnemy();
});

const resize = throttle(() => {
  width = window.innerWidth - 150;
  height = window.innerHeight - 150 - 100;
}, 200);

window.addEventListener('resize', resize);
$event.addEventListener('gameOver', gameOver);

export default loopCloneEnemy;
