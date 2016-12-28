const $social = document.querySelector('.social');

function getStatistic(e) {
  const statistic = e.statistic;
  const keys = Object.keys(statistic);
  let token = 0;

  // передает слово - получает сумму кодов букв в этом слове
  for (let i = 0, len = keys.length; i < len; i++) {
    token += getCharWordSum(statistic[keys[i]]); // значение в Obj
  }

  console.log(token);

  //console.log(statistic)
}

// каждую букву в слове переводит в код и складывает
function getCharWordSum(value) {
  let charCodeSum = 0;

  console.log(value);

  for (let i = 0, len = value.length; i < len; i++) {
    charCodeSum += value.charCodeAt(i);
  }

  return charCodeSum;
}

document.addEventListener('statistic', getStatistic);
