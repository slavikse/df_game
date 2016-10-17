const
  $result = document.querySelector('.result'),
  $resultCount = $result.querySelector('.result-count'),
  $statistic = $result.querySelector('.statistic'),
  $restart = $result.querySelector('.restart');

function result() {
  $result.classList.add('result-show');
  $resultCount.textContent = sessionStorage.getItem('score');
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
  });

  let tmplCompile = '';

  tmpl.forEach(nodeElement => {
    tmplCompile += nodeElement;
  });

  $statistic.innerHTML = tmplCompile;
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

document.addEventListener('gameOver', result);
document.addEventListener('statistic', statistic);
$restart.addEventListener('click', restart);
