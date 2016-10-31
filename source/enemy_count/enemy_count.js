const
  $enemyCount = document.querySelector('.enemy-count'),
  eventNoEnemy = new Event('noEnemy');

let enemyCount = 0;

function enemyAdd(e) {
  enemyCount += e.add;
  enemyCountChange(enemyCount);
}

function enemyDec(e) {
  enemyCount -= e.dec;
  enemyCountChange(enemyCount);

  if (enemyCount === 0) {
    document.dispatchEvent(eventNoEnemy);
  }
}

function enemyCountChange(enemyCount) {
  $enemyCount.textContent = enemyCount;
}

document.addEventListener('enemyAdd', enemyAdd);
document.addEventListener('enemyDec', enemyDec);
