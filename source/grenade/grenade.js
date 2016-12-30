import 'grenade_notice/grenade_notice';

const $body = document.body;
const $grenadeWrap = $body.querySelector('.grenade');
const $grenade = $grenadeWrap.children;
const grenadeFull = 2; // 0,1,2 (3) грены
const grenadeStateClasses = [
  'icon-grenade_empty',
  'icon-grenade_full'
];
const eventGrenade = new Event('grenade');
const eventGrenadeShop = new Event('grenadeShop');

let grenadeCount = 0; // 1 грена в начале игры (нулевая)
let grenadeCountStat = 0;

function grenade() {

  /** GOD MOD */

  if (window.god) {
    document.dispatchEvent(eventGrenade);
    return;
  }

  /** / GOD MOD */

  if (grenadeCount !== -1) { // значит грены НЕ кончились
    grenadeBoom();
  }
}

function grenadeBoom() {
  const grenade = $grenade[grenadeCount];

  grenade.className = grenadeStateClasses[0];
  grenadeCountChangeAnimate(grenade);
  grenadeCount -= 1;

  grenadeCountStat += 1;
  document.dispatchEvent(eventGrenade);
}

function grenadeCountChangeAnimate(grenade) {
  grenade.style.animationName = 'grenade-blink';
  setTimeout(grenadeCountChangeAnimateEnd.bind(null, grenade), 600);
}

function grenadeCountChangeAnimateEnd(grenade) {
  grenade.style.animationName = '';
}

function buyGrenade() {
  if (grenadeCount < grenadeFull) {
    grenadeCount += 1;

    const grenade = $grenade[grenadeCount];
    grenade.className = grenadeStateClasses[1];

    grenadeCountChangeAnimate(grenade);
  }
}

function grenadeShop() {
  removeListenKey();

  eventGrenadeShop.grenade = grenadeCount;
  document.dispatchEvent(eventGrenadeShop);
}

function startGame() {
  setTimeout(showGrenade, 2000);
  addListenKey();
}

function showGrenade() {
  $grenadeWrap.style.opacity = 1;
}

function gKeyHandler(e) {
  if (e.keyCode === 71) {
    grenade();
  }
}

function addListenKey() {
  document.addEventListener('keyup', gKeyHandler);
}

function removeListenKey() {
  document.removeEventListener('keyup', gKeyHandler);
}

function grenadeStatistic() {
  const grenadeCountEvent = new Event('grenadeCount');
  grenadeCountEvent.grenadeCount = grenadeCountStat;
  document.dispatchEvent(grenadeCountEvent);
}

function gameOver() {
  removeListenKey();
  grenadeStatistic();
}

document.addEventListener('startGame', startGame);
document.addEventListener('waveStart', addListenKey);
document.addEventListener('buyGrenade', buyGrenade);
document.addEventListener('waveEnd', grenadeShop);
document.addEventListener('gameOver', gameOver);
