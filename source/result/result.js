const
  $result = document.querySelector('.result'),
  $count = $result.querySelector('.count'),
  $statistic = $result.querySelector('.statistic'),
  $restart = $result.querySelector('.restart');

function result() {
  $result.classList.add('result-show');
  $count.textContent = sessionStorage.getItem('score');
}

function statistic(e) {
  const
    statistic = e.statistic,
    statsKey = Object.keys(statistic);

  const tmpl = statsKey.map(key => {
    return `
      <div class="item">
        <div class="key">${key}</div>
        <div class="value">${statistic[key]}</div>
      </div>
    `
  }).join('');

  $statistic.insertAdjacentHTML('afterBegin', tmpl);
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

document.addEventListener('gameOver', result);
document.addEventListener('statistic', statistic);
$restart.addEventListener('click', restart);
