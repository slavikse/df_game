let shootStat;

function setShootCount(e) {
  const
    shoots = e.shootCountTotal,
    inTarget = e.shootCountInTarget,
    bonusWave = e.shootCountInCat,
    miss = shoots - inTarget,
    inTargetPercent = (inTarget * 100 / shoots).toFixed(2);

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
