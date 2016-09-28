import noise from '../helper/noise';

const
  $healthNotice = document.querySelector('.health-notice'),
  $event = document.querySelector('.event'),
  healAudiosURI = [
    'audio/heal1.mp3',
    'audio/heal2.mp3',
    'audio/heal3.mp3'
  ],
  damageAudiosURI = [
    'audio/damage1.mp3',
    'audio/damage2.mp3',
    'audio/damage3.mp3'
  ],
  gameOverAudiosURI = 'audio/death_scream.mp3';

let healthNoticeTimer = null;

function damage() {
  clearTimeout(healthNoticeTimer);
  noise(damageAudiosURI);
  $healthNotice.style.animationName = 'health-damage';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function regeneration() {
  clearTimeout(healthNoticeTimer);
  noise(healAudiosURI);
  $healthNotice.style.animationName = 'health-regeneration';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function gameOver() {
  clearTimeout(healthNoticeTimer);

  $event.removeEventListener('damage', damage);
  $event.removeEventListener('regeneration', regeneration);
  $event.removeEventListener('gameOver', gameOver);

  noise(gameOverAudiosURI);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

$event.addEventListener('damage', damage);
$event.addEventListener('regeneration', regeneration);
$event.addEventListener('gameOver', gameOver);
