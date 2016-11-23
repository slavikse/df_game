const $result = document.querySelector('.result');
const $statistic = $result.querySelector('.statistic');
const $restart = $result.querySelector('.restart');

let statistic;

function templateCompile(e) {
  statistic = e.statistic;

  const statsKey = Object.keys(statistic);
  const template = statsKey.map(getTemplate).join('');

  $statistic.insertAdjacentHTML('afterBegin', template);
  $result.classList.add('result-show');
}

function getTemplate(key) {
  return `
    <div class='item'>
      <div class='key'>${key}</div>
      <div class='value'>${statistic[key]}</div>
    </div>
  `;
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

document.addEventListener('statistic', templateCompile);
$restart.addEventListener('click', restart);
