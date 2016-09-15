const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  nextTimeFull = 5;

let nextTimeCurrent = nextTimeFull;

function nextWave() {
  setInterval(nextWaveTime, 1000);
}

function nextWaveTime() {
  if (nextTimeCurrent < 0) {
    nextTimeCurrent = nextTimeFull;
  }

  requestAnimationFrame(() => {
    $nextWaveTime.textContent = nextTimeCurrent;
    nextTimeCurrent -= 1;
  });
}

export default nextWave;
