import './../boss_coming/boss_coming';

const $boss = document.querySelector('.boss');
const $body = $boss.querySelector('.boss-body');
const $handL = $boss.querySelector('.boss-hand-l');
const $handR = $boss.querySelector('.boss-hand-r');
const $legL = $boss.querySelector('.boss-leg-l');
const $legR = $boss.querySelector('.boss-leg-r');
const eventEnemyCreate = new Event('enemyCreate');
const eventScoreAdd = new Event('scoreAdd');
// ссылки на части и их хп
const bossParts = [
  [$body, 6],
  [$handL, 3],
  [$handR, 3],
  [$legL, 3],
  [$legR, 3]
];
const partsLength = bossParts.length;

let partsCount = partsLength - 1; // -1, торс в последнюю очередь

eventScoreAdd.add = 100; // за килл босса
setHealth();

function setHealth() {
  for (let i = 0, len = partsLength; i < len; i++) {
    const part = bossParts[i][0];
    const health = bossParts[i][1];

    setPartHealth(part, health);
  }

  bodyNotCrash();
}

function setPartHealth(part, health) {
  part.health = health;
  part.isCrash = true;
  part.children[0].textContent = health; // хп части
}

function bodyNotCrash() {
  $body.isCrash = false; // торс в последнюю очередь
  $body.classList.add('boss-body-not-crash');
}

function docking() {
  $boss.classList.add('boss-docking');

  document.addEventListener('bossShoot', isDamage);
  document.addEventListener('grenade', grenade);
}

function isDamage(e) {
  const target = e.bossPart || e; // e - может быть частью босса (грена)

  if (target.isCrash) {
    damage(target);
  }
}

function damage(target) {
  target.health -= 1;
  target.children[0].textContent -= 1; // хп части

  if (target.health === 0) {
    crash(target);
  }
}

function crash(target) {
  crashTarget(target);
  changePartModel(target);

  partsCount -= 1;

  // можно стрелять в торс?
  if (partsCount === 0) {
    nextBodyCrash();
  }

  // уничтожены все части?
  if (partsCount === -1) {
    undocking();
    bossGone();
  }

  document.dispatchEvent(eventEnemyCreate);
}

function crashTarget(target) {
  target.classList.add('crash');
  target.isCrash = false; // уже разрушен. хватит
}

function changePartModel(target) {
  // ищет класс начинающийся с icon-* и удаляет последний пробел
  const partClass = target.className.match(/icon-.* /)[0].slice(0, -1);
  target.classList.remove(partClass);
  target.classList.add(`${partClass}_rock`);

  target.children[0].remove(); // удаляет хп
}

function nextBodyCrash() {
  $body.isCrash = true;
  $body.classList.remove('boss-body-not-crash');
}

function undocking() {
  document.removeEventListener('bossShoot', isDamage);
  document.removeEventListener('grenade', grenade);

  $boss.classList.add('boss-undocking');

  // 0 - торс не участвует
  for (let i = 1, len = partsLength; i < len; i++) {
    const part = bossParts[i][0];

    undockingPart(part);
  }
}

//TODO придумать более элегантный распад + стили
function undockingPart(part) {
  let animationName = getComputedStyle(part).animationName;

  animationName += '-crash';
  part.style.animationName = animationName;
}

function bossGone() {
  document.dispatchEvent(eventScoreAdd);
}

function grenade() {
  for (let i = 0, len = partsLength; i < len; i++) {
    const part = bossParts[i][0];

    isDamage(part);
  }
}

document.addEventListener('boss', docking);
