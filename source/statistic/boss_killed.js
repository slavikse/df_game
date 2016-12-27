let bossKilled;

function setBossKilled(e) {
  bossKilled = e.bossKilled;
}

function getBossKilled() {
  return bossKilled;
}

document.addEventListener('bossKilled', setBossKilled);

export default getBossKilled;
