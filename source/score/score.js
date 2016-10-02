const
  $event = document.querySelector('.event'),
  $scoreCount = document.querySelector('.score-count');

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
  localStorage.setItem('score', scoreCount);
}

$event.addEventListener('scoreChange', scoreChange);
$event.addEventListener('gameOver', gameOver);
window.onbeforeunload = gameOver;
