import noise from '../helper/noise';

const
  $healthNotice = document.querySelector('.health-notice'),
  $event = document.querySelector('.event'),
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

  $event.removeEventListener('damage', damage);
  $event.removeEventListener('regeneration', regeneration);
  $event.removeEventListener('gameOver', gameOver);

  noise(audioSprite, audioSpriteJson.death_scream);
  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

$event.addEventListener('damage', damage);
$event.addEventListener('regeneration', regeneration);
$event.addEventListener('gameOver', gameOver);
