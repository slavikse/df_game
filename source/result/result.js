const
  $result = document.querySelector('.result'),
  $statistic = $result.querySelector('.statistic'),
  $restart = $result.querySelector('.restart');

let statistic;

function getStatistic(e) {
  statistic = e.statistic;

  const
    statsKey = Object.keys(statistic),
    tmpl = statsKey.map(getTmpl).join('');

  console.warn('RESULT only one!');

  $statistic.insertAdjacentHTML('afterBegin', tmpl);
  $result.classList.add('result-show');
}

function getTmpl(key) {
  return `
    <div class="item">
      <div class="key">${key}</div>
      <div class="value">${statistic[key]}</div>
    </div>
  `;
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

document.addEventListener('statistic', getStatistic);
$restart.addEventListener('click', restart);
