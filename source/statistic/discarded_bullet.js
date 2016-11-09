let discardedBullet;

function setDiscardedBullet(e) {
  discardedBullet = e.discardedBullet;
}

function getDiscardedBullet() {
  return discardedBullet;
}

document.addEventListener('discardedBullet', setDiscardedBullet);

export default getDiscardedBullet;
