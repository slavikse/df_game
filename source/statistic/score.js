let score;

function setScore(e) {
  score = e.score;
}

function getScore() {
  return score;
}

document.addEventListener('score', setScore);

export default getScore;
