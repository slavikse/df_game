const $scoreCount = document.querySelector('.score-count');

let scoreCount = 0;

function scoreChange(e) {
  scoreCount += e.detail.change;
  $scoreCount.textContent = scoreCount;

  scoreJump();
}

function scoreJump() {
  $scoreCount.animationName = 'score-change';

  setTimeout(() => {
    $scoreCount.animationName = '';
  }, 100); // animate
}

function gameOver() {
  const bestScore = localStorage.getItem('best-score');

  localStorage.setItem('score', scoreCount);

  if (scoreCount > bestScore) {
    localStorage.setItem('best-score', scoreCount);
  }
}

document.addEventListener('scoreChange', scoreChange);
document.addEventListener('gameOver', gameOver);
document.onbeforeunload = gameOver;
