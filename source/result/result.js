const
  $result = document.querySelector('.result'),
  $resultCount = $result.querySelector('.result-count'),
  $event = document.querySelector('.event');

function result() {
  console.log('result');
}

$event.addEventListener('gameOver', result);
