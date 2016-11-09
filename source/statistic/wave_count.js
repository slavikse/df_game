let waveCount;

function setWaveCount(e) {
  waveCount = e.waveCount;
}

function getWaveCount() {
  return waveCount;
}

document.addEventListener('waveCount', setWaveCount);

export default getWaveCount;
