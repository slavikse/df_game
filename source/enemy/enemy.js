import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

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
  dieSoundsURI = [
    'audio/monster_die1.mp3',
    'audio/monster_die2.mp3',
    'audio/monster_die3.mp3',
    'audio/monster_die4.mp3'
  ],
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: +5}}),
  eventDamage = new Event('damage');

let
  width = window.innerWidth - 150,
  height = window.innerHeight - 150 - 100, // 150 - размеры моделек монстров, 100 - под скорбоард;
  enemyCount = 0;

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

  $temp.appendChild(fragment);

  enemyCountChange(enemyCloneCount);
}

function setPosition(clone) {
  const
    x = range(0, width),
    y = range(0, height);

  clone.style.transform = `translate(${x}px, ${y}px)`;
}

function setImage(clone) {
  const random = range(0, imagesClassesLength);
  clone.children[1].classList.add(imagesClasses[random]);
}

function setDamage(clone) {
  const timerDamage = range(6, 10);
  clone.children[0].style.animationDuration = `${timerDamage}s`; // damage node

  /** enemy сохраняет свой таймер урона */
  clone.children[1].enemyDamageTimer = setTimeout(() => { // enemy node
    $event.dispatchEvent(eventDamage);
    enemyKill(clone.children[1]); // enemy node
  }, timerDamage * 1000);
}

function enemyKill(enemy) {
  enemy.classList.add('is-kill');

  removeDamage(enemy);
  removeEnemy(enemy);
  enemyCountChange(-1);
}

function removeDamage(enemy) {
  clearTimeout(enemy.enemyDamageTimer);
  enemy.previousElementSibling.remove(); // полоска урона
}

function removeEnemy(enemy) {
  enemy.style.animationName = 'enemy-flip';

  setTimeout(() => {
    enemy.remove();
  }, 200);
}

/* в скор борд */
function enemyCountChange(change) {
  enemyCount += change;
  $enemyCount.textContent = enemyCount;
}

$event.addEventListener('enemyKill', e => {
  noise(dieSoundsURI);
  enemyKill(e.enemy.target);

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

export default loopCloneEnemy;
