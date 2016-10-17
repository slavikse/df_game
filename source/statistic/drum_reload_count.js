let drumReloadCount;

function drumReloadCountSet(e) {
  drumReloadCount = e.drumReloadCount;
}

function drumReloadCountGet() {
  return drumReloadCount;
}

document.addEventListener('drumReloadCount', drumReloadCountSet);

export default drumReloadCountGet;
