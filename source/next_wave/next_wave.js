const
  $nextWaveTime = document.querySelector('.next-wave-time'),
  $event = document.querySelector('.event'),
  nextTimeFull = 5;

let
  nextWaveInterval = null,
  nextTimeCurrent = nextTimeFull;

function nextWave() {
  nextWaveInterval = setInterval(nextWaveTime, 1000);
}

function nextWaveTime() {
  nextTimeCurrent -= 1;
  $nextWaveTime.textContent = nextTimeCurrent;

  if (nextTimeCurrent < 1) {
    nextTimeCurrent = nextTimeFull;
  }
}

function stopTimer() {
  clearInterval(nextWaveInterval);
}

$event.addEventListener('nextWaveTimer', nextWave);
$event.addEventListener('stopGame', stopTimer);
