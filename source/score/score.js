const $scoreCurrent = document.querySelector('.score-current');
let scoreCurrent = 0;

function scoreAdd(e) {
  scoreCurrent += e.detail.change;
  scoreChange();
}

function scoreDec(e) {
  scoreCurrent -= e.dec;
  scoreChange();
}

function scoreChange() {
  $scoreCurrent.textContent = scoreCurrent;
  sessionStorage.setItem('score', scoreCurrent);
}

function gameOver() {
  const bestScore = localStorage.getItem('best-score') || 0;

  if (scoreCurrent > bestScore) {
    localStorage.setItem('best-score', scoreCurrent);
  }

  sessionStorage.setItem('score', scoreCurrent);
}

document.addEventListener('scoreAdd', scoreAdd);
document.addEventListener('scoreDec', scoreDec);
document.addEventListener('gameOver', gameOver);
window.onbeforeunload = gameOver;
