let shootStat;

function shootCountSet(e) {
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

function shootCountGet() {
  return shootStat;
}

document.addEventListener('shootCount', shootCountSet);

export default shootCountGet;
