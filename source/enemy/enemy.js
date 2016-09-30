import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

const
  $enemyPosition = document.querySelector('.enemy-position'),
  $event = document.querySelector('.event'),
  $temp = document.querySelector('.temp'),
  enemyCloneCount = 7,
  imagesClasses = [
    'icon-monster1',
    'icon-monster2',
    'icon-monster3',
    'icon-monster4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  eventEnemyCountChange = new CustomEvent('enemyCountChange', {detail: {change: enemyCloneCount}}),
  eventEnemyKill = new CustomEvent('enemyCountChange', {detail: {change: -1}}),
  eventScoreChange = new CustomEvent('scoreChange', {detail: {change: 5}}),
  eventDamage = new Event('damage'),
  audioSprite = window.audioSprite,
  audioSpriteJson = window.audioSpriteJson,
  dieAudios = [
    audioSpriteJson.monster_die1,
    audioSpriteJson.monster_die2,
    audioSpriteJson.monster_die3,
    audioSpriteJson.monster_die4,
  ],
  playingFieldResize = throttle(playingField, 200);

let
  playingFieldWidth,
  playingFieldHeight;

playingField();

function cloneEnemy() {
  let fragment = document.createDocumentFragment();

  for (let i = 0, len = enemyCloneCount; i < len; i++) {
    let clone = $enemyPosition.cloneNode(true);
    clone = setPosition(clone);
    clone = setImage(clone);
    clone = setDamage(clone);
    fragment.appendChild(clone);
  }

  $temp.appendChild(fragment);
  $event.dispatchEvent(eventEnemyCountChange);
}

function setPosition(clone) {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;

  return clone;
}

function setImage(clone) {
  const
    enemy = clone.children[1],
    random = range(0, imagesClassesLength);

  enemy.classList.add(imagesClasses[random]);

  return clone;
}

function setDamage(clone) {
  const
    damageTimer = range(6, 10),
    damageNode = clone.children[0];

  damageNode.style.animationDuration = `${damageTimer}s`;

  /** enemy сохраняет свой таймер урона
   * для дальнейшего его удаления */
  clone.damageTimer = setTimeout(() => {
    $event.dispatchEvent(eventDamage);
    removeEnemy(clone);
  }, damageTimer * 1000);

  return clone;
}

function removeEnemy(clone) {
  let
    damageNode = clone.children[0],
    enemyNode = clone.children[1];

  clearTimeout(clone.damageTimer);
  $event.dispatchEvent(eventEnemyKill);

  damageNode.remove();
  enemyNode.classList.add('enemy-kill');
  clone.style.zIndex = 0; // для возможности стрелять по тем, кто под убитым

  setTimeout(() => {
    clone.remove();
  }, 500); // анимация. половина от 1s
}

function enemyKill(e) {
  const clone = e.enemy.parentNode;

  removeEnemy(clone);
  noise(audioSprite, dieAudios);

  $event.dispatchEvent(eventScoreChange);
}

function gameOver() {
  $temp.remove();
}

function playingField() {
  const
    enemyWidth = 94,
    enemyHeight = 148,
    panelHeight = 100;

  playingFieldWidth = window.innerWidth - enemyWidth;
  playingFieldHeight = window.innerHeight - enemyHeight - panelHeight;
}

$event.addEventListener('enemyCreate', cloneEnemy);
$event.addEventListener('enemyKill', enemyKill);
$event.addEventListener('gameOver', gameOver);
window.addEventListener('resize', playingFieldResize);
