import range from 'libs/range';
import throttle from 'libs/throttle';
import delay from 'libs/delay';
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
const enemyCloneCountDefault = 4; // 4
const enemyCloneCount = enemyCloneCountDefault;
/** время для доанимирования врагов.
 подчищаем остатки (актуально для конца игры) */
const grenadeDelay = delay(grenade, 600);
const eventEnemyAdd = new Event('enemyAdd');
const eventEnemyDec = new Event('enemyDec');
const eventScoreAdd = new Event('scoreAdd');
const eventDamage = new Event('damage');

let $paddock = $body.querySelector('.paddock');
let enemyTimerID = []; // для грены
let allEnemyCurrent = 0; // для грены
let playingFieldWidth;
let playingFieldHeight;

eventEnemyDec.dec = enemyDec;
eventScoreAdd.add = scoreAdd;

playingField();

function cloneEnemy(e) {
  // при попадании в котика, генерит e.enemyCloneCount
  const cloneCount = e.enemyCloneCount || enemyCloneCount;
  const fragment = document.createDocumentFragment();

  allEnemyCurrent += cloneCount;

  cloneCreate(cloneCount, fragment);
  $paddock.appendChild(fragment);

  eventEnemyAdd.add = cloneCount;
  document.dispatchEvent(eventEnemyAdd);
}

function cloneCreate(cloneCount, fragment) {
  for (let i = 0; i < cloneCount; i++) {
    const clone = $enemyPosition.cloneNode(true);

    setPosition(clone);
    setDamage(clone);
    setImage(clone);
    setHealth(clone);

    clone.isKill = false;
    fragment.appendChild(clone);
  }
}

function setPosition(clone) {
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;
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
  enemyTimerID.push(timerID);
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
}

function setHealth(clone) {
  const healthNode = clone.querySelector('.enemy-health');
  const health = range(...enemyHealthDefault);

  healthNode.health = health;
  healthNode.textContent = health;
}

function isEnemyShoot(e) {
  const clone = e.enemy.parentNode;

  // защита от частого выстрела в 1 точку, если враг жив
  if (!clone.isKill) {
    enemyShoot(clone);
  }
}

function enemyShoot(clone) {
  const warningNode = clone.querySelector('.enemy-warning');
  const damageNode = clone.querySelector('.enemy-damage');
  const enemyNode = clone.querySelector('.enemy');
  const healthNode = clone.querySelector('.enemy-health');

  if (healthNode.health === 1) { // когда будет 1, то значит уже готов
    clone.isKill = true;
    enemyDeath({clone, warningNode, damageNode, enemyNode, healthNode});
  } else {
    healthNode.health -= 1;
    healthNode.textContent = healthNode.health;
  }
}

function enemyDeath(nodes) {
  noise(audioURI, dieAudios);
  enemyHide(nodes);
  document.dispatchEvent(eventScoreAdd);
}

function enemyHide(nodes) {
  clearTimeout(nodes.clone.warningTimer);
  clearTimeout(nodes.clone.damageTimer);

  nodes.warningNode.style.opacity = 0;
  nodes.healthNode.style.opacity = 0;

  nodes.enemyNode.style.animationName = 'enemy-kill';
  nodes.clone.classList.add('enemy-position-hide');

  allEnemyCurrent -= 1;
  document.dispatchEvent(eventEnemyDec);
  setTimeout(enemyHideDelay.bind(null, nodes.clone), 600); // анимация
}

function enemyHideDelay(clone) {
  clone.style.opacity = 0;
}

function grenade() {
  pointsCount();
  allEnemyCurrent = 0;

  $paddock.remove();
  createPaddock();

  enemyTimerID.forEach(clearTimer);
  enemyTimerID = [];
}

function createPaddock() {
  const paddockNode = document.createElement('div');
  paddockNode.classList.add('paddock');
  $body.appendChild(paddockNode);
  $paddock = $body.querySelector('.paddock');
}

function clearTimer(id) {
  clearTimeout(id);
}

function pointsCount() {
  eventEnemyDec.dec = allEnemyCurrent;
  eventScoreAdd.add = scoreAdd * allEnemyCurrent;

  document.dispatchEvent(eventEnemyDec);
  document.dispatchEvent(eventScoreAdd);

  // возвращаем значения по умолчанию
  eventEnemyDec.dec = enemyDec;
  eventScoreAdd.add = scoreAdd;
}

function playingField() {
  const enemyWidth = 150;
  const enemyHeight = 150;
  const panelHeight = 100;

  playingFieldWidth = window.innerWidth - enemyWidth;
  playingFieldHeight = window.innerHeight - enemyHeight - panelHeight;
}

document.addEventListener('startGame', createPaddock);
document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyShoot', isEnemyShoot);
document.addEventListener('grenade', grenade);
document.addEventListener('waveStart', createPaddock);
document.addEventListener('waveEnd', grenadeDelay);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', grenade);
