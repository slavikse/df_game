import delay from 'libs/delay';

const $score = document.querySelector('.score');
const scoreShopDelay = delay(scoreShop, 20); // чтобы успел записать

let score = 0;
let eventScoreShop = new Event('scoreShop');
let scoreEvent = new Event('score');

function scoreAdd(e) {
  score += e.add;
  scoreChange();
}

function scoreDec(e) {
  score -= e.dec;
  scoreChange();
}

function scoreChange() {
  $score.textContent = score;
}

function scoreShop() {
  eventScoreShop.score = score;
  document.dispatchEvent(eventScoreShop);
}

function scoreStatistic() {
  scoreEvent.score = score;
  document.dispatchEvent(scoreEvent);
}

document.addEventListener('scoreAdd', scoreAdd);
document.addEventListener('scoreDec', scoreDec);
document.addEventListener('waveEnd', scoreShopDelay);
document.addEventListener('gameOver', scoreStatistic);

// scoreAdd({add: 500});
