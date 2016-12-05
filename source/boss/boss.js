import './../boss_coming/boss_coming';
import throttle from 'libs/throttle';
import range from 'libs/range';
import notify from '../notify/notify';

const $body = document.body;
const $paddock = $body.querySelector('.boss-paddock');
const $boss = $body.querySelector('.boss');
const playingFieldResize = throttle(playingField, 500);
const bossWidth = 260;
const bossHeight = 260;
const eventEnemyCreate = new Event('enemyCreate');
const eventBossGone = new Event('bossGone');
const eventScoreAdd = new Event('scoreAdd');

const scoreBossKilled = 100;
// настройки босса: анимация, хп, иконка. порядок важен для setNodes
const bossSetting = [
  {animation: 'boss-body', health: 6, icon: 'icon-boss_body'},
  {animation: 'boss-hand-l', health: 3, icon: 'icon-boss_hand_l'},
  {animation: 'boss-hand-r', health: 3, icon: 'icon-boss_hand_r'},
  {animation: 'boss-leg-l', health: 3, icon: 'icon-boss_leg_l'},
  {animation: 'boss-leg-r', health: 3, icon: 'icon-boss_leg_r'}
];

let playingFieldWidth;
let playingFieldHeight;

playingField();

function cloneBoss() {
  const clone = $boss.cloneNode(true);

  setNodes(clone);
  setPosition(clone);
  setSetting(clone);
  setQueueCrash(clone);

  $paddock.appendChild(clone);
  docking(clone);
}

function setNodes(clone) {
  const bodyNode = clone.querySelector('.boss-body');
  const handLNode = clone.querySelector('.boss-hand-l');
  const handRNode = clone.querySelector('.boss-hand-r');
  const legLNode = clone.querySelector('.boss-leg-l');
  const legRNode = clone.querySelector('.boss-leg-r');

  // порядок node важен для bossSetting
  const nodes = {bodyNode, handLNode, handRNode, legLNode, legRNode};
  const nodeKeys = Object.keys(nodes);

  // сохраняем для последующего использования
  clone.nodes = nodes;
  clone.nodeKeys = nodeKeys;
}

function setPosition(clone) {
  const x = range(bossWidth, playingFieldWidth);
  const y = range(bossHeight, playingFieldHeight);

  clone.style.transform = `translate(${x}px, ${y}px)`;
}

// в каждую часть босса записывает его конфигурацию
function setSetting(clone) {
  const nodes = clone.nodes;
  const nodeKeys = clone.nodeKeys;

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    const node = nodes[nodeKeys[i]];
    const setting = bossSetting[i];

    setSettingNode(node, setting);
  }

  const bodyNode = nodes[nodeKeys[0]];
  setBodyNoCrash(bodyNode);
}

function setSettingNode(node, setting) {
  node.setting = setting; // для этого важен порядок
  node.children[0].textContent = setting.health; // хп части
  node.isCrash = true;
}

function setBodyNoCrash(bodyNode) {
  bodyNode.isCrash = false; // торс в последнюю очередь
  bodyNode.classList.add('no-crash');
}

/** -1, торс разрушается в последнюю очередь
 * очередь из частей босса, после того,
 * как все части будут уничтожены,
 * настанет очередь торса */
function setQueueCrash(clone) {
  clone.queue = clone.nodeKeys.length - 1;
}

/*************** СБОРКА ***************/

function docking(clone) {
  clone.classList.add('boss-docking');

  document.addEventListener('bossShoot', isDamage);
  document.addEventListener('grenade', grenade.bind(null, clone));
}

function isDamage(e) {
  const node = e.bossNode;

  if (node.isCrash) {
    damage(node);
  }
}

function damage(node) {
  node.setting.health -= 1;
  node.children[0].textContent -= 1; // хп части

  if (node.setting.health === 0) {
    crash(node);
  }
}

function crash(node) {
  const clone = node.parentNode;

  nodeCrash(node);
  changeModel(node);

  clone.queue -= 1;
  const queue = clone.queue;

  // можно стрелять в торс?
  if (queue === 0) {
    bodyCrash(clone);
  }

  // уничтожены все части?
  if (queue === -1) {
    undocking(clone);
    bossGone();
  }

  document.dispatchEvent(eventEnemyCreate);
}

function nodeCrash(node) {
  node.classList.add('crash');
  node.isCrash = false; // уже разрушен. хватит
}

function changeModel(node) {
  const nodeIcon = node.setting.icon;

  node.classList.remove(nodeIcon);
  node.classList.add(`${nodeIcon}_rock`);

  node.children[0].style.opacity = 0; // скрываем хп
}

function bodyCrash(clone) {
  const bodyNode = clone.nodes.bodyNode;

  bodyNode.isCrash = true;
  bodyNode.classList.remove('no-crash');
}

function undocking(clone) {
  const nodes = clone.nodes;
  const nodeKeys = clone.nodeKeys;

  clone.classList.add('boss-undocking');

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    const node = nodes[nodeKeys[i]];
    const animation = node.setting.animation;

    node.style.animationName = `${animation}-crash`;
  }
}

function bossGone() {
  notify({type: 'info', message: `+${scoreBossKilled}$`});

  document.removeEventListener('bossShoot', isDamage);
  document.removeEventListener('grenade', grenade);

  eventScoreAdd.add = scoreBossKilled;
  document.dispatchEvent(eventScoreAdd);
  document.dispatchEvent(eventBossGone);
}

function grenade(clone) {
  const nodes = clone.nodes;
  const nodeKeys = clone.nodeKeys;

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    const bossNode = {bossNode: nodes[nodeKeys[i]]};

    isDamage(bossNode);
  }
}

function playingField() {
  const panelHeight = 100;

  playingFieldWidth = window.innerWidth - bossWidth;
  playingFieldHeight = window.innerHeight - bossHeight - panelHeight;
}

document.addEventListener('boss', cloneBoss);
window.addEventListener('resize', playingFieldResize);

//TODO проверить!
