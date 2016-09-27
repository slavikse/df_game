import noise from '../helper/noise';

const
  $healthNotice = document.querySelector('.health-notice'),
  $event = document.querySelector('.event');

let healthNoticeTimer = null;

function damage() {
  clearTimeout(healthNoticeTimer);
  $healthNotice.style.animationName = 'health-damage';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 1200); // 2 анимации по 600 ms
}

function regeneration() {
  clearTimeout(healthNoticeTimer);
  noise('audio/heal.mp3');
  $healthNotice.style.animationName = 'health-regeneration';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function gameOver() {
  clearTimeout(healthNoticeTimer);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

$event.addEventListener('damage', damage);
$event.addEventListener('regeneration', regeneration);
$event.addEventListener('gameOver', gameOver);
