const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  $event = document.querySelector('.event'),
  nextTimeFull = 5;

let nextTimeCurrent = nextTimeFull;

function nextWave() {
  setInterval(nextWaveTime, 1000);
}

function nextWaveTime() {
  nextTimeCurrent -= 1;
  $nextWaveTime.textContent = nextTimeCurrent; // без raf

  if (nextTimeCurrent < 1) {
    nextTimeCurrent = nextTimeFull;
  }
}

$event.addEventListener('nextWaveTimer', nextWave);
