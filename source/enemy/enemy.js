import range from 'libs/range';
import throttle from 'libs/throttle';
import noise from './../helper/noise';

const
  $body = document.body,
  $enemyPosition = $body.querySelector('.enemy-position'),
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
  enemyCloneCountDefault = 3,
  enemyHealthDefault = [1, 2],
  enemyDamageTimeDefault = [6, 8],
  enemyCloneCount = enemyCloneCountDefault,
  $temp = $body.querySelector('.temp'),
  playingFieldWidth,
  playingFieldHeight;

eventEnemyDec.dec = 1;
eventScoreAdd.add = 7;

playingField();

function cloneEnemy(e) {
  let fragment = document.createDocumentFragment();
  enemyCloneCount = e.enemyCloneCount || enemyCloneCount; // котик генерит эвент

  for (let i = 0, len = enemyCloneCount; i < len; i++) {
    let clone = $enemyPosition.cloneNode(true);
    clone = setPosition(clone);
    clone = setDamage(clone);
    clone = setImage(clone);
    clone = setHealth(clone);
    fragment.appendChild(clone);
  }

  $temp.appendChild(fragment);

  eventEnemyAdd.add = enemyCloneCount;
  document.dispatchEvent(eventEnemyAdd);
  enemyCloneCount = enemyCloneCountDefault;
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
    damageTimer = range(...enemyDamageTimeDefault),
    damageNode = clone.children[0],
    enemyNode = clone.children[1],
    healthNode = clone.children[2];

  damageNode.style.animationDuration = `${damageTimer}s`;

  /** enemy сохраняет свой таймер урона
   * для дальнейшего его удаления */
  clone.damageTimer = setTimeout(
    damageAndEnemyHide.bind(null, clone, damageNode, enemyNode, healthNode),
    damageTimer * 1000
  );

  return clone;
}

function damageAndEnemyHide(clone, damageNode, enemyNode, healthNode) {
  document.dispatchEvent(eventDamage);
  enemyHide(clone, damageNode, enemyNode, healthNode);
}

function setImage(clone) {
  const
    enemyNode = clone.children[1],
    random = range(0, imagesClassesLength);

  enemyNode.classList.add(imagesClasses[random]);

  return clone;
}

function setHealth(clone) {
  const
    healthNode = clone.children[2],
    health = range(...enemyHealthDefault);

  healthNode.health = health;
  healthNode.textContent = health;

  return clone;
}

function enemyKill(e) {
  const
    clone = e.enemy.parentNode,
    damageNode = clone.children[0],
    enemyNode = clone.children[1],
    healthNode = clone.children[2];

  enemyHealthDec(healthNode);

  if (
    healthNode.death || // мертв
    !enemyIsDeath(healthNode) // жив
  ) {
    return;
  }

  enemyDeath(clone, damageNode, enemyNode, healthNode);
}

function enemyHealthDec(healthNode) {
  healthNode.style.animationName = 'enemy-health-dec';

  setTimeout(() => {
    healthNode.style.animationName = '';
  }, 100); // animate
}

function enemyIsDeath(healthNode) {
  if (healthNode.health > 1) {
    healthNode.health -= 1;
    healthNode.textContent = healthNode.health;
    return false; // еще жив
  }

  healthNode.death = true;
  return true;
}

function enemyDeath(clone, damageNode, enemyNode, healthNode) {
  noise(audioURI, dieAudios);
  enemyHide(clone, damageNode, enemyNode, healthNode);
  document.dispatchEvent(eventScoreAdd);
}

function enemyHide(clone, damageNode, enemyNode, healthNode) {
  clearTimeout(clone.damageTimer);

  damageNode.style.visibility = 'hidden';
  healthNode.style.visibility = 'hidden';

  enemyNode.style.animationName = 'enemy-kill';
  clone.classList.add('enemy-hide');

  document.dispatchEvent(eventEnemyDec);
  setTimeout(enemyHideDelay.bind(null, clone), 500); // анимация
}

function enemyHideDelay(clone) {
  clone.style.visibility = 'hidden';
}

function playingField() {
  const
    enemyWidth = 150,
    enemyHeight = 150,
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
  setTimeout(() => {
    $temp.remove();
  }, 500); // чтобы успеть последнему мобу доанимировать
}

document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyKill', enemyKill);
document.addEventListener('waveEnd', removeEnemyNode);
document.addEventListener('waveStart', createEnemyNode);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', removeEnemyNode);
