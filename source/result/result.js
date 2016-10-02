const
  $result = document.querySelector('.result'),
  $resultCount = $result.querySelector('.result-count'),
  $restart = $result.querySelector('.restart'),
  $event = document.querySelector('.event');

function result() {
  $result.classList.add('result-show');
  $resultCount.textContent = localStorage.getItem('score');
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

$restart.addEventListener('click', restart);
$event.addEventListener('gameOver', result);
