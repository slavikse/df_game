import range from 'libs/range';
import throttle from 'libs/throttle';
import noise from './../helper/noise';

const
  $body = document.body,
  $enemyPosition = $body.querySelector('.enemy-position'),
  imagesClasses = [
    'icon-enemy1',
    'icon-enemy2',
    'icon-enemy3',
    'icon-enemy4'
  ],
  imagesClassesLength = imagesClasses.length - 1,
  eventEnemyAdd = new Event('enemyAdd'),
  eventEnemyDec = new Event('enemyDec'),
  eventScoreAdd = new Event('scoreAdd'),
  eventDamage = new Event('damage'),
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  dieAudios = [
    audioSprite.enemy_die1,
    audioSprite.enemy_die2,
    audioSprite.enemy_die3,
    audioSprite.enemy_die4,
  ],
  playingFieldResize = throttle(playingField, 500);

let
  timerIDs = [], // собирает все id таймеров, для последующего удаления
  enemyCloneCountDefault = 4,
  enemyCloneCurrent = 0,
  enemyDec = 1,
  scoreAdd = 7,
  enemyHealthDefault = [1, 2],
  enemyDamageTimeDefault = [6, 8],
  enemyCloneCount = enemyCloneCountDefault,
  $paddock = $body.querySelector('.paddock'),
  playingFieldWidth,
  playingFieldHeight;

eventEnemyDec.dec = enemyDec;
eventScoreAdd.add = scoreAdd;

playingField();

function cloneEnemy(e) {
  const enemyCloneCountCurrent = e.enemyCloneCount || enemyCloneCount;
  let fragment = document.createDocumentFragment();

  /** при попадании в котика, генерит e.enemyCloneCount */
  for (let i = 0; i < enemyCloneCountCurrent; i++) {
    let clone = $enemyPosition.cloneNode(true);
    clone = setPosition(clone);
    clone = setDamage(clone);
    clone = setImage(clone);
    clone = setHealth(clone);
    fragment.appendChild(clone);
  }

  $paddock.appendChild(fragment);

  enemyCloneCurrent += enemyCloneCountCurrent;
  eventEnemyAdd.add = enemyCloneCountCurrent;
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
    damageTimer = range(...enemyDamageTimeDefault) * 1000,
    warningNode = clone.querySelector('.enemy-warning'),
    damageNode = clone.querySelector('.enemy-damage'),
    enemyNode = clone.querySelector('.enemy'),
    healthNode = clone.querySelector('.enemy-health');

  clone.warningTimer = setTimeout(
    enemyWarning.bind(null, warningNode),
    damageTimer - 1000
  );

  /** сохраняет таймер урона для дальнейшего его удаления */
  const timerID = setTimeout(
    enemyDamage.bind(null, {clone, warningNode, damageNode, enemyNode, healthNode}),
    damageTimer
  );

  clone.damageTimer = timerID;
  timerIDs.push(timerID);

  return clone;
}

function enemyWarning(warningNode) {
  warningNode.style.opacity = 1;
}

function enemyDamage(nodes) {
  nodes.warningNode.style.opacity = 0;
  nodes.damageNode.style.animationPlayState = 'running';
  document.dispatchEvent(eventDamage);
  enemyHide(nodes);
}

function setImage(clone) {
  const
    enemyNode = clone.querySelector('.enemy'),
    random = range(0, imagesClassesLength);

  enemyNode.classList.add(imagesClasses[random]);

  return clone;
}

function setHealth(clone) {
  const
    healthNode = clone.querySelector('.enemy-health'),
    health = range(...enemyHealthDefault);

  healthNode.health = health;
  healthNode.textContent = health;

  return clone;
}

function enemyKill(e) {
  const
    clone = e.enemy.parentNode,
    warningNode = clone.querySelector('.enemy-warning'),
    damageNode = clone.querySelector('.enemy-damage'),
    enemyNode = clone.querySelector('.enemy'),
    healthNode = clone.querySelector('.enemy-health');

  enemyShoot(enemyNode);
  enemyHealthDec(healthNode);

  if (healthNode.death || !enemyIsDeath(healthNode)) {
    return;
  }

  enemyDeath({clone, warningNode, damageNode, enemyNode, healthNode});
}

function enemyShoot(enemyNode) {
  enemyNode.style.animationName = 'enemy-shoot';
  setTimeout(enemyShootEnd.bind(null, enemyNode), 100);
}

function enemyShootEnd(enemyNode) {
  enemyNode.style.animationName = '';
}

function enemyHealthDec(healthNode) {
  healthNode.style.animationName = 'enemy-health-dec';
  setTimeout(enemyHealthDecEnd.bind(null, healthNode), 100); // animate
}

function enemyHealthDecEnd(healthNode) {
  healthNode.style.animationName = '';
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

function enemyDeath(nodes) {
  noise(audioURI, dieAudios);
  enemyHide(nodes);
  document.dispatchEvent(eventScoreAdd);
}

function enemyHide(nodes) {
  clearTimeout(nodes.clone.warningTimer);
  clearTimeout(nodes.clone.damageTimer);

  nodes.warningNode.style.visibility = 'hidden';
  nodes.healthNode.style.visibility = 'hidden';

  nodes.enemyNode.classList.add('enemy-kill');
  nodes.clone.classList.add('enemy-hide');

  enemyCloneCurrent -= 1;
  document.dispatchEvent(eventEnemyDec);
  setTimeout(enemyHideDelay.bind(null, nodes.clone), 500); // анимация
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
  let paddockNode = document.createElement('div');
  paddockNode.classList.add('paddock');
  $body.appendChild(paddockNode);
  $paddock = $body.querySelector('.paddock');
}

function removeEnemyNode() {
  setTimeout(removeEnemyNodeDelay, 500); // чтобы успеть последнему мобу доанимировать
}

function removeEnemyNodeDelay() {
  timerIDs = [];
  $paddock.remove();
}

function bomb() {
  bombEvents();

  timerIDs.forEach(id => {
    clearTimeout(id);
  });

  $paddock.remove();
  timerIDs = [];
  enemyCloneCurrent = 0;
  createEnemyNode();
}

function bombEvents() {
  eventEnemyDec.dec = enemyCloneCurrent;
  eventScoreAdd.add = scoreAdd * enemyCloneCurrent;

  document.dispatchEvent(eventEnemyDec);
  document.dispatchEvent(eventScoreAdd);

  eventEnemyDec.dec = enemyDec;
  eventScoreAdd.add = scoreAdd;
}

document.addEventListener('startGame', createEnemyNode);
document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyKill', enemyKill);
document.addEventListener('bomb', bomb);
document.addEventListener('waveStart', createEnemyNode);
document.addEventListener('waveEnd', removeEnemyNode);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', removeEnemyNode);
