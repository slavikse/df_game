let shootStat;

function setShootCount(e) {
  const shoots = e.shootCountTotal;
  const inTarget = e.shootCountInTarget;
  const bonusWave = e.shootCountInCat;
  const miss = shoots - inTarget;
  const inTargetPercent = (inTarget * 100 / shoots).toFixed(2);

  shootStat = {
    shoots,
    inTarget,
    miss,
    inTargetPercent,
    bonusWave
  }
}

function getShootCount() {
  return shootStat;
}

document.addEventListener('shootCount', setShootCount);

export default getShootCount;
