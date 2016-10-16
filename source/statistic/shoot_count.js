function shootCountSet(e) {
  const
    shoots = e.shootCountTotal,
    inTarget = e.shootCountInTarget,
    inCat = e.shootCountInCat,
    miss = shoots - inTarget,
    inTargetPercent = (inTarget * 100 / shoots).toFixed(2);

  console.log(`
    Выстрелов: ${shoots}
    В цель: ${inTarget}
    Промахов: ${miss}
    Точность: ${inTargetPercent}%
    Доп волн: ${inCat}
  `);
}

document.addEventListener('shootCount', shootCountSet);
