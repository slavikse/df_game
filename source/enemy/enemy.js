import range from 'libs/range';
import throttle from 'libs/throttle';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $body = document.body;
const $enemyPosition = $body.querySelector('.enemy-position');
const imagesClasses = [
  'icon-enemy1',
  'icon-enemy2',
  'icon-enemy3',
  'icon-enemy4'
];
const imagesClassesLength = imagesClasses.length - 1;
const eventEnemyAdd = new Event('enemyAdd');
const eventEnemyDec = new Event('enemyDec');
const eventScoreAdd = new Event('scoreAdd');
const eventDamage = new Event('damage');
const dieAudios = [
  audioSprite.enemy_die1,
  audioSprite.enemy_die2,
  audioSprite.enemy_die3,
  audioSprite.enemy_die4,
];
const playingFieldResize = throttle(playingField, 500);
const enemyDec = 1;
const scoreAdd = 7;
const enemyHealthDefault = [1, 2];
const enemyDamageTimeDefault = [6, 8];
const enemyCloneCountDefault = 4;
const enemyCloneCount = enemyCloneCountDefault;

let $paddock = $body.querySelector('.paddock');
let timerIDs = [];
let enemyCloneCurrent = 0;
let playingFieldWidth;
let playingFieldHeight;

eventEnemyDec.dec = enemyDec;
eventScoreAdd.add = scoreAdd;

playingField();

function cloneEnemy(e) {
  const enemyCloneCountCurrent = e.enemyCloneCount || enemyCloneCount;
  const fragment = document.createDocumentFragment();

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
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;

  return clone;
}

function setDamage(clone) {
  const damageTimer = range(...enemyDamageTimeDefault) * 1000;
  const warningNode = clone.querySelector('.enemy-warning');
  const damageNode = clone.querySelector('.enemy-damage');
  const enemyNode = clone.querySelector('.enemy');
  const healthNode = clone.querySelector('.enemy-health');

  clone.warningTimer = setTimeout(
    enemyWarning.bind(null, warningNode),
    damageTimer - 1000
  );

  /** сохраняет таймер урона для дальнейшего его удаления */
  const timerID = setTimeout(
    enemyDamage.bind(null, {
      clone,
      warningNode,
      damageNode,
      enemyNode,
      healthNode
    }),
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
  const enemyNode = clone.querySelector('.enemy');
  const random = range(0, imagesClassesLength);

  enemyNode.classList.add(imagesClasses[random]);

  return clone;
}

function setHealth(clone) {
  const healthNode = clone.querySelector('.enemy-health');
  const health = range(...enemyHealthDefault);

  healthNode.health = health;
  healthNode.textContent = health;

  return clone;
}

function enemyShoot(e) {
  const clone = e.enemy.parentNode;
  const warningNode = clone.querySelector('.enemy-warning');
  const damageNode = clone.querySelector('.enemy-damage');
  const enemyNode = clone.querySelector('.enemy');
  const healthNode = clone.querySelector('.enemy-health');

  enemyShootAnimate(enemyNode);
  enemyHealthDec(healthNode);

  if (healthNode.health <= 1) {
    enemyDeath({clone, warningNode, damageNode, enemyNode, healthNode});
  } else {
    healthNode.health -= 1;
    healthNode.textContent = healthNode.health;
  }
}

function enemyShootAnimate(enemyNode) {
  enemyNode.style.animationName = 'enemy-shoot';
  setTimeout(enemyShootAnimateEnd.bind(null, enemyNode), 100);
}

function enemyShootAnimateEnd(enemyNode) {
  enemyNode.style.animationName = '';
}

function enemyHealthDec(healthNode) {
  healthNode.style.animationName = 'enemy-health';
  setTimeout(enemyHealthDecEnd.bind(null, healthNode), 100); // animate
}

function enemyHealthDecEnd(healthNode) {
  healthNode.style.animationName = '';
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
  const enemyWidth = 150;
  const enemyHeight = 150;
  const panelHeight = 100;

  playingFieldWidth = window.innerWidth - enemyWidth;
  playingFieldHeight = window.innerHeight - enemyHeight - panelHeight;
}

function createEnemyNode() {
  const paddockNode = document.createElement('div');
  paddockNode.classList.add('paddock');
  $body.appendChild(paddockNode);
  $paddock = $body.querySelector('.paddock');
}

function removeEnemyNode() {
  setTimeout(removeEnemyNodeDelay, 500);
}

function removeEnemyNodeDelay() {
  timerIDs = [];
  $paddock.remove();
}

function grenade() {
  pointsCount();

  timerIDs.forEach(id => {
    clearTimeout(id);
  });

  $paddock.remove();
  timerIDs = [];
  enemyCloneCurrent = 0;
  createEnemyNode();
}

function pointsCount() {
  eventEnemyDec.dec = enemyCloneCurrent;
  eventScoreAdd.add = scoreAdd * enemyCloneCurrent;

  document.dispatchEvent(eventEnemyDec);
  document.dispatchEvent(eventScoreAdd);

  eventEnemyDec.dec = enemyDec;
  eventScoreAdd.add = scoreAdd;
}

document.addEventListener('startGame', createEnemyNode);
document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyShoot', enemyShoot);
document.addEventListener('grenade', grenade);
document.addEventListener('waveStart', createEnemyNode);
document.addEventListener('waveEnd', removeEnemyNode);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', removeEnemyNode);
