const
  $enemyCount = document.querySelector('.enemy-count'),
  eventNoEnemy = new Event('noEnemy');

let enemyCount = 0;

function enemyAdd(e) {
  enemyCount += e.add;
  enemyCountChange();
}

function enemyDec(e) {
  enemyCount -= e.dec;
  enemyCountChange();

  if (enemyCount === 0) {
    document.dispatchEvent(eventNoEnemy);
  }
}

function enemyCountChange() {
  $enemyCount.textContent = enemyCount;
}

document.addEventListener('enemyAdd', enemyAdd);
document.addEventListener('enemyDec', enemyDec);
