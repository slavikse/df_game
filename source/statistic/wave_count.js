function waveCountSet(e) {
  console.log(`Продержался волн: ${e.waveCount}`);
}

document.addEventListener('waveCount', waveCountSet);
