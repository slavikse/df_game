const
  $result = document.querySelector('.result'),
  $resultCount = $result.querySelector('.result-count'),
  $event = document.querySelector('.event');

function result() {
  $result.classList.add('result-show');
  $resultCount.textContent = localStorage.getItem('score');
}

$event.addEventListener('gameOver', result);
