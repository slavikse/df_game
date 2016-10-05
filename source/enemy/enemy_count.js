const $enemyCount = document.querySelector('.enemy-count');

let enemyCount = 0;

function enemyCountChange(e) {
  enemyCount += e.detail.change;
  $enemyCount.textContent = enemyCount;
}

document.addEventListener('enemyCountChange', enemyCountChange);
