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
  $scoreCount.classList.add('score-change');

  setTimeout(() => {
    $scoreCount.classList.remove('score-change');
  }, 100); // animate
}

$event.addEventListener('scoreChange', scoreChange);
