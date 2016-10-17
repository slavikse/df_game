let waveCount;

function waveCountSet(e) {
  waveCount = e.waveCount;
}

function waveCountGet() {
  return waveCount;
}

document.addEventListener('waveCount', waveCountSet);

export default waveCountGet;
