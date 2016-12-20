import delay from 'libs/delay';

const $score = document.querySelector('.score');
const scoreShopDelay = delay(scoreShop, 10); // чтобы успел записать счет
const eventScoreShop = new Event('scoreShop');
const scoreEvent = new Event('score');

let score = 0;

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

//scoreAdd({add: 500});
