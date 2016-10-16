import range from 'libs/range';
import throttle from 'libs/throttle';
import noise from './../helper/noise';

const
  $body = document.body,
  $enemyPosition = $body.querySelector('.enemy-position'),
  enemyCloneCount = 6,
  imagesClasses = [
    'icon-monster1',
    'icon-monster2',
    'icon-monster3',
    'icon-monster4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  eventEnemyAdd = new Event('enemyAdd'),
  eventEnemyDec = new Event('enemyDec'),
  eventScoreAdd = new Event('scoreAdd'),
  eventDamage = new Event('damage'),
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  dieAudios = [
    audioSprite.monster_die1,
    audioSprite.monster_die2,
    audioSprite.monster_die3,
    audioSprite.monster_die4,
  ],
  playingFieldResize = throttle(playingField, 500);

let
  $temp = $body.querySelector('.temp'),
  playingFieldWidth,
  playingFieldHeight;

eventEnemyAdd.add = enemyCloneCount;
eventEnemyDec.dec = 1;
eventScoreAdd.add = 5;

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
  document.dispatchEvent(eventEnemyAdd);
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
  clone.damageTimer = setTimeout(
    damageAndEnemyHide.bind(null, clone, damageNode, enemyNode),
    damageTimer * 1000
  );

  return clone;
}

function setImage(clone) {
  const
    enemyNode = clone.children[1],
    random = range(0, imagesClassesLength);

  enemyNode.classList.add(imagesClasses[random]);

  return clone;
}

function damageAndEnemyHide(clone, damageNode, enemyNode) {
  document.dispatchEvent(eventDamage);
  enemyHide(clone, damageNode, enemyNode);
}

function enemyHide(clone, damageNode, enemyNode) {
  clearTimeout(clone.damageTimer);
  damageNode.style.visibility = 'hidden';

  enemyNode.style.animationName = 'enemy-kill';
  clone.style.zIndex = 0; // для возможности стрелять по тем, кто под убитым

  document.dispatchEvent(eventEnemyDec);
  setTimeout(enemyHideDelay.bind(null, clone), 500); // анимация
}

function enemyHideDelay(clone) {
  clone.style.visibility = 'hidden';
}

function enemyKill(e) {
  const
    clone = e.enemy.parentNode,
    damageNode = clone.children[0],
    enemyNode = clone.children[1];

  if (!enemyNode) {
    return;
  }

  noise(audioURI, dieAudios);
  enemyHide(clone, damageNode, enemyNode);
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

function createEnemyNode() {
  let tempNode = document.createElement('div');
  tempNode.classList.add('temp');

  $body.appendChild(tempNode);
  $temp = $body.querySelector('.temp');
}

function removeEnemyNode() {
  $temp.remove();
}

document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyKill', enemyKill);
document.addEventListener('waveEnd', removeEnemyNode);
document.addEventListener('waveStart', createEnemyNode);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', removeEnemyNode);
