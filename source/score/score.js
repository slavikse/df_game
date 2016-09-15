const
  $event = document.querySelector('.event'),
  $scoreCount = document.querySelector('.score-count');

let scoreCount = 0;

function scoreChange(e) {
  scoreCount += e.detail.increment;

  requestAnimationFrame(() => {
    $scoreCount.textContent = scoreCount;
  });

  scoreJump();
}

function scoreJump() {
  $scoreCount.classList.add('score-change-animate');

  setTimeout(() => {
    $scoreCount.classList.remove('score-change-animate');
  }, 100); // animate
}

$event.addEventListener('scoreChange', scoreChange);
