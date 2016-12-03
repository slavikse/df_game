import '../health_notice/health_notice';

const $body = document.body;
const $healthWrap = $body.querySelector('.health-wrap');
const $firstAid = $healthWrap.querySelector('.first-aid').children;
const firstAidFull = 1; // 0,1 (2) аптечки
const firstAidStateClasses = [
  'icon-first_aid_empty',
  'icon-first_aid_full'
];
const $health = $healthWrap.querySelector('.health').children;
const healthFull = 2; // 0,1,2 (3) сердечка
const healthStateClasses = [
  'icon-heart_empty',
  'icon-heart_half',
  'icon-heart_full'
];
const halfHealthFull = 1; // 0,1 (2) состояния сердечка. (3) полное
const eventRegeneration = new Event('regeneration');
const eventFirstAidShop = new Event('firstAidShop');

let receivedDamageStat = 0;
let firstAidUseStat = 0;
let firstAid = firstAidFull;
let health = healthFull;
let halfHealth = halfHealthFull;

function damage() {

  /** GOD MOD */

  if (window.god) {
    return;
  }

  /** / GOD MOD */

  if (health === 0) {
    gameOver();
  } else {
    heartBeat();
    saveReceivedDamageStatistic();
  }
}

function heartBeat() {
  // половинка сердца закончилась?
  if (halfHealth < 0) {
    health -= 1;
    halfHealth = halfHealthFull;
  }

  $health[health].className = healthStateClasses[halfHealth];
  $health[health].style.animationName = 'health-blink';
  halfHealth -= 1;

  setTimeout(heartBeatEnd, 600);
}

function heartBeatEnd() {
  $health[health].style.animationName = '';
}

/** есть хилки и (не полное хп или не часть хп) */
function useFirstAid() {
  if (
    firstAid !== -1 && (
      health !== healthFull ||
      halfHealth !== halfHealthFull
    )
  ) {
    $firstAid[firstAid].className = firstAidStateClasses[0];
    firstAid -= 1;

    regeneration();
  }
}

function regeneration() {
  $body.classList.add('dont-shoot');

  health = healthFull;
  halfHealth = halfHealthFull;

  for (let i = 0, len = healthFull; i <= len; i++) {
    $health[i].className = healthStateClasses[2];
  }

  setTimeout(dontShootEnd, 600);
  saveFirstAidUseStat();
  document.dispatchEvent(eventRegeneration);
}

function dontShootEnd() {
  $body.classList.remove('dont-shoot');
}

function addFirstAid() {
  if (firstAid < firstAidFull) {
    firstAid += 1;
    $firstAid[firstAid].className = firstAidStateClasses[1];
    $firstAid[firstAid].style.animationName = 'first-aid-blink';

    setTimeout(addFirstAidEnd, 600); // анимация
  }
}

function addFirstAidEnd() {
  $firstAid[firstAid].style.animationName = '';
}

function firstAidShop() {
  eventFirstAidShop.firstAid = firstAid;
  document.dispatchEvent(eventFirstAidShop);
}

function saveFirstAidUseStat() {
  firstAidUseStat += 1;
}

function saveReceivedDamageStatistic() {
  receivedDamageStat += 1;
}

function receivedDamageStatistic() {
  const receivedDamageEvent = new Event('receivedDamage');
  receivedDamageEvent.receivedDamage = receivedDamageStat;
  document.dispatchEvent(receivedDamageEvent);
}

function firstAidUseStatistic() {
  const firstAidUseEvent = new Event('firstAidUse');
  firstAidUseEvent.firstAidUse = firstAidUseStat;
  document.dispatchEvent(firstAidUseEvent);
}

function hKeyHandler(e) {
  if (e.keyCode === 72) {
    useFirstAid();
  }
}

// средняя кнопка мыши
function cmbHandler(e) {
  if (e.which === 2) {
    e.preventDefault();
    useFirstAid();
  }
}

function gameOver() {
  document.removeEventListener('keyup', hKeyHandler);

  receivedDamageStatistic();
  firstAidUseStatistic();

  document.dispatchEvent(new Event('gameOver'));
}

document.addEventListener('damage', damage);
document.addEventListener('keyup', hKeyHandler);
document.addEventListener('mousedown', cmbHandler);
document.addEventListener('waveEnd', firstAidShop);
document.addEventListener('buyFirstAid', addFirstAid);
