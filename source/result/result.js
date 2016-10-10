const
  $result = document.querySelector('.result'),
  $resultCount = $result.querySelector('.result-count'),
  $restart = $result.querySelector('.restart');

function result() {
  $result.classList.add('result-show');
  $resultCount.textContent = sessionStorage.getItem('score');
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

$restart.addEventListener('click', restart);
document.addEventListener('gameOver', result);
