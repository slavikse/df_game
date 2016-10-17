let discardedBullet;

function discardedBulletSet(e) {
  discardedBullet = e.discardedBullet;
}

function discardedBulletGet() {
  return discardedBullet;
}

document.addEventListener('discardedBullet', discardedBulletSet);

export default discardedBulletGet;
