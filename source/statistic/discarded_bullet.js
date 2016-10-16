function discardedBulletSet(e) {
  console.log(`Пуль выброшено: ${e.discardedBullet}`);
}

document.addEventListener('discardedBullet', discardedBulletSet);
