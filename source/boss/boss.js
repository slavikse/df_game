import './../boss_coming/boss_coming';
import throttle from 'libs/throttle';
import range from 'libs/range';
import clone from 'libs/clone';
import notify from '../notify/notify';

const $body = document.body;
const $paddock = $body.querySelector('.boss-paddock');
const $boss = $body.querySelector('.boss');
const playingFieldResize = throttle(playingField, 500);
const bossWidth = 280;
const bossHeight = 280;
const eventEnemyCreate = new Event('enemyCreate');
const eventBossGone = new Event('bossGone');
const eventScoreAdd = new Event('scoreAdd');

let scoreBossKilled = 200;
// настройки босса: анимация, хп, иконка. порядок важен для setNodes
const bossSettingDefault = [
  {health: [4, 6], animation: 'boss-body', icon: 'icon-boss_body'},
  {health: [2, 4], animation: 'boss-hand-l', icon: 'icon-boss_hand_l'},
  {health: [2, 4], animation: 'boss-hand-r', icon: 'icon-boss_hand_r'},
  {health: [2, 4], animation: 'boss-leg-l', icon: 'icon-boss_leg_l'},
  {health: [2, 4], animation: 'boss-leg-r', icon: 'icon-boss_leg_r'}
];

let playingFieldWidth;
let playingFieldHeight;

playingField();

function cloneBoss() {
  const boss = $boss.cloneNode(true);
  const bossSetting = clone(bossSettingDefault);

  setNodes(boss);
  setPosition(boss);
  setSetting(boss, bossSetting);
  setQueueCrash(boss);

  $paddock.appendChild(boss);
  docking(boss);
}

function setNodes(boss) {
  const bodyNode = boss.querySelector('.boss-body');
  const handLNode = boss.querySelector('.boss-hand-l');
  const handRNode = boss.querySelector('.boss-hand-r');
  const legLNode = boss.querySelector('.boss-leg-l');
  const legRNode = boss.querySelector('.boss-leg-r');

  // порядок node важен для bossSetting
  const nodes = {bodyNode, handLNode, handRNode, legLNode, legRNode};
  const nodeKeys = Object.keys(nodes);

  // сохраняем для последующего использования
  boss.nodes = nodes;
  boss.nodeKeys = nodeKeys;
}

function setPosition(boss) {
  const x = range(0, playingFieldWidth);
  const y = range(0, playingFieldHeight);

  boss.style.transform = `translate(${x}px, ${y}px)`;
}

// в каждую часть босса записывает его конфигурацию
function setSetting(boss, bossSetting) {
  const nodes = boss.nodes;
  const nodeKeys = boss.nodeKeys;

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    const node = nodes[nodeKeys[i]];
    const setting = bossSetting[i];

    setSettingNode(node, setting);
  }

  const bodyNode = nodes[nodeKeys[0]];
  setBodyNoCrash(bodyNode);
}

function setSettingNode(node, setting) {
  const health = range(...setting.health);

  setting.health = health;
  node.setting = setting; // для этого важен порядок
  node.children[0].textContent = health; // хп части
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
function setQueueCrash(boss) {
  boss.queue = boss.nodeKeys.length - 1;
}

/*************** СБОРКА ***************/

function docking(boss) {
  boss.classList.add('boss-docking');

  document.addEventListener('bossShoot', isDamage);
  document.addEventListener('grenade', grenade.bind(null, boss));
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
  const boss = node.parentNode;

  nodeCrash(node);
  changeModel(node);

  boss.queue -= 1;
  const queue = boss.queue;

  // можно стрелять в торс?
  if (queue === 0) {
    bodyCrash(boss);
  }

  // уничтожены все части?
  if (queue === -1) {
    undocking(boss);
    bossGone(boss);
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

function bodyCrash(boss) {
  const bodyNode = boss.nodes.bodyNode;

  bodyNode.isCrash = true;
  bodyNode.classList.remove('no-crash');
}

function undocking(boss) {
  const nodes = boss.nodes;
  const nodeKeys = boss.nodeKeys;

  boss.classList.add('boss-undocking');

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    const node = nodes[nodeKeys[i]];
    const animation = node.setting.animation;

    node.style.animationName = `${animation}-crash`;
  }
}

function bossGone(boss) {
  notify({type: 'info', message: `+${scoreBossKilled}$`});

  document.removeEventListener('bossShoot', isDamage);
  document.removeEventListener('grenade', grenade);

  eventScoreAdd.add = scoreBossKilled;
  document.dispatchEvent(eventScoreAdd);
  document.dispatchEvent(eventBossGone);

  levelUp(boss);
  setTimeout(bossClear.bind(null, boss), 2000);
}

// повышение хп боссу и ценника за килл
function levelUp(boss) {
  const nodeKeys = boss.nodeKeys;

  for (let i = 0, len = nodeKeys.length; i < len; i++) {
    bossSettingDefault[i].health[0] += 2;
    bossSettingDefault[i].health[1] += 2;
  }

  scoreBossKilled += 200;
}

function bossClear(boss) {
  boss.remove();
}

function grenade(boss) {
  const nodes = boss.nodes;
  const nodeKeys = boss.nodeKeys;

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
