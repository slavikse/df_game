const $scoreCurrent = document.querySelector('.score-current');
let scoreCurrent = 0;

function scoreChange(e) {
  scoreCurrent += e.detail.change;
  $scoreCurrent.textContent = scoreCurrent;
  sessionStorage.setItem('score', scoreCurrent);

  scoreJump();
}

function scoreJump() {
  $scoreCurrent.style.animationName = 'score-change';

  setTimeout(() => {
    $scoreCurrent.style.animationName = '';
  }, 100); // animate
}

function gameOver() {
  const bestScore = localStorage.getItem('best-score') || 0;

  if (scoreCurrent > bestScore) {
    localStorage.setItem('best-score', scoreCurrent);
  }

  sessionStorage.setItem('score', scoreCurrent);
}

document.addEventListener('scoreChange', scoreChange);
document.addEventListener('gameOver', gameOver);
window.onbeforeunload = gameOver;
