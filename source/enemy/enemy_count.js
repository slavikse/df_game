const
  $enemyCount = document.querySelector('.enemy-count'),
  eventNoEnemies = new Event('noEnemies');

let enemyCount = 0;

function enemyCountChange(e) {
  enemyCount += e.detail.change;
  $enemyCount.textContent = enemyCount;

  if (enemyCount === 0) {
    document.dispatchEvent(eventNoEnemies);
  }
}

document.addEventListener('enemyCountChange', enemyCountChange);
