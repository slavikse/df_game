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

  healthNoticeTimer = setTimeout(damageEnd, 600); // анимация
}

function damageEnd() {
  $healthNotice.style.animationName = '';
}

function regeneration() {
  clearTimeout(healthNoticeTimer);
  noise(audioURI, healAudiosURI);
  $healthNotice.style.animationName = 'health-regeneration';

  healthNoticeTimer = setTimeout(regenerationEnd, 600); // анимация
}

function regenerationEnd() {
  $healthNotice.style.animationName = '';
}

function gameOver() {
  clearTimeout(healthNoticeTimer);

  noise(audioURI, audioSprite.death);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');

  document.removeEventListener('damage', damage);
  document.removeEventListener('regeneration', regeneration);
  document.removeEventListener('gameOver', gameOver);
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
