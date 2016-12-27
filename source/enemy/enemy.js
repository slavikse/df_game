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
let scoreAdd = 5;
const enemyCloneCount = 4;
const enemyHealth = [1, 2];
const enemyDamageTime = [4, 6];
const enemyWidth = 200;
const enemyHeight = 200;
/** для доанимирования врагов и подчищаем остатки (актуально для конца игры) */
const grenadeDelay = delay(grenade, 600);
const eventEnemyDec = new Event('enemyDec');
const eventEnemyAdd = new Event('enemyAdd');
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
  const fragment = cloneCreate(cloneCount);

  $paddock.appendChild(fragment);
  counters(cloneCount);
}

function cloneCreate(cloneCount) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cloneCount; i++) {
    const clone = $enemyPosition.cloneNode(true);

    setNodes(clone);
    setPosition(clone);
    setDamageTimer(clone);
    setImage(clone);
    setHealth(clone);

    clone.isKill = false;
    fragment.appendChild(clone);
  }

  return fragment;
}

function setNodes(clone) {
  const warningNode = clone.querySelector('.enemy-warning');
  const damageNode = clone.querySelector('.enemy-damage');
  const enemyNode = clone.querySelector('.enemy');
  const healthNode = clone.querySelector('.enemy-health');

  // сохраняем для последующего использования
  clone.nodes = {warningNode, damageNode, enemyNode, healthNode};
}

function setPosition(clone) {
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;
}

function setDamageTimer(clone) {
  const damageTimer = range(...enemyDamageTime) * 1000; // в секундах

  clone.warningTimerID = setTimeout(
    enemyWarning.bind(null, clone.nodes.warningNode),
    damageTimer - 1000 // за секунду до появления уведомления
  );

  saveDamageTimer(clone, damageTimer);
}

function enemyWarning(warningNode) {
  warningNode.style.opacity = 1;
}

/** сохраняет таймер урона для дальнейшего его удаления */
function saveDamageTimer(clone, damageTimer) {
  const timerID = setTimeout(enemyDamage.bind(null, clone), damageTimer);

  clone.damageTimerID = timerID;
  enemyTimerID.push(timerID);
}

function enemyDamage(clone) {
  const nodes = clone.nodes;
  nodes.warningNode.style.opacity = 0;
  nodes.damageNode.style.animationPlayState = 'running';

  document.dispatchEvent(eventDamage);
  enemyHide(clone);
}

function setImage(clone) {
  const random = range(0, imagesClassesLength);
  clone.nodes.enemyNode.classList.add(imagesClasses[random]);
}

function setHealth(clone) {
  const healthNode = clone.nodes.healthNode;
  const health = range(...enemyHealth);

  healthNode.health = health;
  healthNode.textContent = health.toString();
}

function isEnemyShoot(e) {
  // enemy target
  const clone = e.enemy.parentNode;

  // защита от частого выстрела в 1 точку, если враг жив
  if (!clone.isKill) {
    enemyShoot(clone);
  }
}

function enemyShoot(clone) {
  const healthNode = clone.nodes.healthNode;

  // будет === 1, значит дни его сочтены
  if (healthNode.health === 1) {
    clone.isKill = true;
    enemyDeath(clone);
  } else {
    healthNode.health -= 1;
    healthNode.textContent = healthNode.health;
  }
}

function enemyDeath(clone) {
  noise(audioURI, dieAudios);
  document.dispatchEvent(eventScoreAdd);
  enemyHide(clone);
}

function enemyHide(clone) {
  const nodes = clone.nodes;

  clearTimeout(clone.warningTimerID);
  clearTimeout(clone.damageTimerID);

  nodes.warningNode.style.opacity = 0;
  nodes.healthNode.style.opacity = 0;
  nodes.enemyNode.style.animationName = 'enemy-kill';

  clone.classList.add('enemy-events-none'); // блокируем от выстрелов

  allEnemyCurrent -= 1;
  document.dispatchEvent(eventEnemyDec);
  setTimeout(enemyHideDelay.bind(null, clone), 600); // анимация
}

function enemyHideDelay(clone) {
  clone.style.opacity = 0;
}

function grenade() {
  additionPoints();
  allEnemyCurrent = 0;

  $paddock.remove();
  createPaddock();

  enemyTimerID.forEach(clearTimer);
  enemyTimerID = [];
}

function levelUp() {
  scoreAdd += 2;
  //enemyCloneCount += 2;

  // увеличение хп монстра
  enemyHealth[0] += 1;
  enemyHealth[1] += 1;

  // увеличение времени таймера урона
  enemyDamageTime[0] += 1;
  enemyDamageTime[1] += 1;
}

// начисление очков за использование грены
function additionPoints() {
  eventEnemyDec.dec = allEnemyCurrent;
  eventScoreAdd.add = scoreAdd * allEnemyCurrent;

  document.dispatchEvent(eventEnemyDec);
  document.dispatchEvent(eventScoreAdd);

  // возвращаем значения по умолчанию
  eventEnemyDec.dec = enemyDec;
  eventScoreAdd.add = scoreAdd;
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

function counters(cloneCount) {
  allEnemyCurrent += cloneCount;

  eventEnemyAdd.add = cloneCount;
  document.dispatchEvent(eventEnemyAdd);
}

function playingField() {
  const panelHeight = 100;

  playingFieldWidth = window.innerWidth - enemyWidth;
  playingFieldHeight = window.innerHeight - enemyHeight - panelHeight;
}

document.addEventListener('enemyCreate', cloneEnemy);
document.addEventListener('enemyShoot', isEnemyShoot);
document.addEventListener('grenade', grenade);
document.addEventListener('waveEnd', grenadeDelay);
document.addEventListener('bossGone', levelUp);
window.addEventListener('resize', playingFieldResize);
document.addEventListener('gameOver', grenade);
