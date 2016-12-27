let shootStat;

function setShootCount(e) {
  const shoots = e.shootCountTotal;
  const inTarget = e.shootCountInTarget;
  const shootCat = e.shootCountInCat;
  const miss = shoots - inTarget;
  const inTargetPercent = (inTarget * 100 / shoots).toFixed(2);

  shootStat = {
    shoots,
    inTarget,
    miss,
    inTargetPercent,
    shootCat
  }
}

function getShootCount() {
  return shootStat;
}

document.addEventListener('shootCount', setShootCount);

export default getShootCount;
