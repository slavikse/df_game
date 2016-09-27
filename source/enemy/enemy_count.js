const
  $enemyCount = document.querySelector('.enemy-count'),
  $event = document.querySelector('.event');

let enemyCount = 0;

function enemyCountChange(e) {
  enemyCount += e.detail.change;
  $enemyCount.textContent = enemyCount;
}

$event.addEventListener('enemyCountChange', enemyCountChange);
