import '../grenade_notice/grenade_notice';

const $grenade = document.querySelector('.grenade');
const $grenadeCount = $grenade.querySelector('.grenade-count');
const eventGrenade = new Event('grenade');

let grenadeCount = 1;
let grenadeCountTotalStat = 0;

changeCount();

function changeCount(change = 0) {
  grenadeCount += change;
  $grenadeCount.textContent = `x${grenadeCount}`;
}

function grenade() {
  if (grenadeCount - 1 < 0) {
    return;
  }

  changeCount(-1);
  grenadeCountTotalStat += 1;
  document.dispatchEvent(eventGrenade);
}

function buyGrenade() {
  changeCount(1);
}

function showGrenade() {
  $grenade.style.opacity = 1;
}

function startGame() {
  setTimeout(showGrenade, 2000);
  addListenKey();
}

function GKeyHandler(e) {
  if (e.keyCode === 71) {
    grenade();
  }
}

function addListenKey() {
  document.addEventListener('keyup', GKeyHandler);
}

function removeListenKey() {
  document.removeEventListener('keyup', GKeyHandler);
}

function grenadeStatistic() {
  const grenadeCountEvent = new Event('grenadeCount');
  grenadeCountEvent.grenadeCountTotal = grenadeCountTotalStat;
  document.dispatchEvent(grenadeCountEvent);
}

function gameOver() {
  removeListenKey();
  grenadeStatistic();
}

document.addEventListener('startGame', startGame);
document.addEventListener('waveStart', addListenKey);
document.addEventListener('buyGrenade', buyGrenade);
document.addEventListener('waveEnd', removeListenKey);
document.addEventListener('gameOver', gameOver);
