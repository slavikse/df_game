import range from 'libs/range';
import noise from './../helper/noise';
import throttle from 'libs/throttle';

const
  $enemyPosition = document.querySelector('.enemy-position'),
  $temp = document.querySelector('.temp'),
  enemyCloneCount = 4,
  imagesClasses = [
    'icon-monster1',
    'icon-monster2',
    'icon-monster3',
    'icon-monster4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  eventEnemyCountChange = new CustomEvent('enemyCountChange', {detail: {change: enemyCloneCount}}),
  eventEnemyKill = new CustomEvent('enemyCountChange', {detail: {change: -1}}),
  eventScoreAdd = new CustomEvent('scoreAdd', {detail: {change: 5}}),
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
    clone = setDamage(clone);
    clone = setImage(clone);
    fragment.appendChild(clone);
  }

  $temp.appendChild(fragment);
  document.dispatchEvent(eventEnemyCountChange);
}

function setPosition(clone) {
  const
    x = range(0, playingFieldWidth),
    y = range(0, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;

  return clone;
}

function setDamage(clone) {
  const
    damageTimer = range(6, 10),
    damageNode = clone.children[0],
    enemyNode = clone.children[1];

  damageNode.style.animationDuration = `${damageTimer}s`;

  /** enemy сохраняет свой таймер урона
   * для дальнейшего его удаления */
  clone.damageTimer = setTimeout(() => {
    document.dispatchEvent(eventDamage);
    removeEnemy(clone, damageNode, enemyNode);
  }, damageTimer * 1000);

  return clone;
}

function setImage(clone) {
  const
    enemyNode = clone.children[1],
    random = range(0, imagesClassesLength);

  enemyNode.classList.add(imagesClasses[random]);

  return clone;
}

function removeEnemy(clone, damageNode, enemyNode) {
  /**
   * выстрел по врагу в момент удаления (+ таймера урона)
   * враг еще существует
   */
  if (!enemyNode) {
    return;
  }

  clearTimeout(clone.damageTimer);
  document.dispatchEvent(eventEnemyKill);

  enemyNode.style.animationName = 'enemy-kill';
  damageNode.remove();
  clone.style.zIndex = 0; // для возможности стрелять по тем, кто под убитым

  setTimeout(() => {
    clone.remove();
  }, 500); // анимация. половина от 1s
}

function enemyKill(e) {
  const
    clone = e.enemy.parentNode,
    damageNode = clone.children[0],
    enemyNode = clone.children[1];

  removeEnemy(clone, damageNode, enemyNode);
  noise(audioSprite, dieAudios);

  document.dispatchEvent(eventScoreAdd);
}

function playingField() {
  const
    enemyWidth = 94,
    enemyHeight = 148,
    panelHeight = 100;

  playingFieldWidth = window.innerWidth - enemyWidth;
  playingFieldHeight = window.innerHeight - enemyHeight - panelHeight;
}

function gameOver() {
  $temp.remove();
}

document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyKill', enemyKill);
document.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', gameOver);
