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

$event.addEventListener('scoreChange', scoreChange);
