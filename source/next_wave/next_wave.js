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

  if (nextTimeCurrent <= 0) {
    nextTimeCurrent = nextTimeFull;
  }
}

function gameOver() {
  clearInterval(nextWaveInterval);
}

$event.addEventListener('startGame', nextWave);
$event.addEventListener('gameOver', gameOver);
