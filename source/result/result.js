const $result = document.querySelector('.result');
const $statistic = $result.querySelector('.result__statistic');
const $restart = $result.querySelector('.result__restart');

let statistic;

function templateCompile(e) {
  statistic = e.statistic;

  const statsKey = Object.keys(statistic);
  const template = statsKey.map(getTemplate).join('');

  $statistic.insertAdjacentHTML('afterBegin', template);
  $result.classList.add('result__show');
}

function getTemplate(key) {
  return "<div class='result__item'>" +
    "<div class='result__key'>" + key + "</div>" +
    "<div class='result__value'>" + statistic[key] + "</div></div>";
}

function restart() {
  $restart.removeEventListener('click', restart);
  location.reload();
}

document.addEventListener('statistic', templateCompile);
$restart.addEventListener('click', restart);
