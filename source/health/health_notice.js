import noise from '../helper/noise';

const
  $healthNotice = document.querySelector('.health-notice'),
  audioURI = window.audioURI,
  audioSprite = window.audioSprite,
  healAudiosURI = [
    audioSprite.heal1,
    audioSprite.heal2
  ],
  damageAudiosURI = [
    audioSprite.damage1,
    audioSprite.damage2,
    audioSprite.damage3
  ];

let healthNoticeTimer;

function damage() {
  clearTimeout(healthNoticeTimer);
  noise(audioURI, damageAudiosURI);
  $healthNotice.style.animationName = 'health-damage';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function regeneration() {
  clearTimeout(healthNoticeTimer);
  noise(audioURI, healAudiosURI);
  $healthNotice.style.animationName = 'health-regeneration';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function gameOver() {
  clearTimeout(healthNoticeTimer);

  document.removeEventListener('damage', damage);
  document.removeEventListener('regeneration', regeneration);
  document.removeEventListener('gameOver', gameOver);

  noise(audioURI, audioSprite.death_scream);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
