import noise from '../helper/noise';

const
  $healthNotice = document.querySelector('.health-notice'),
  audioSprite = window.audioSprite,
  audioSpriteJson = window.audioSpriteJson,
  healAudiosURI = [
    audioSpriteJson.heal1,
    audioSpriteJson.heal2,
    audioSpriteJson.heal3
  ],
  damageAudiosURI = [
    audioSpriteJson.damage1,
    audioSpriteJson.damage2,
    audioSpriteJson.damage3
  ];

let healthNoticeTimer = null;

function damage() {
  clearTimeout(healthNoticeTimer);
  noise(audioSprite, damageAudiosURI);
  $healthNotice.style.animationName = 'health-damage';

  healthNoticeTimer = setTimeout(() => {
    $healthNotice.style.animationName = '';
  }, 600); // анимация
}

function regeneration() {
  clearTimeout(healthNoticeTimer);
  noise(audioSprite, healAudiosURI);
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

  noise(audioSprite, audioSpriteJson.death_scream);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
