let drumReloadCount;

function setDrumReloadCount(e) {
  drumReloadCount = e.drumReloadCount;
}

function getDrumReloadCount() {
  return drumReloadCount;
}

document.addEventListener('drumReloadCount', setDrumReloadCount);

export default getDrumReloadCount;
