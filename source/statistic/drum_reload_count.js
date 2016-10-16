function discardedBulletSet(e) {
  console.log(`Перезарядок: ${e.drumReloadCount}`);
}

document.addEventListener('drumReloadCount', discardedBulletSet);
