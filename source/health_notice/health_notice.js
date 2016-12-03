import {audioURI, audioSprite} from '../helper/audio_sprite';
import noise from '../helper/noise';

const $healthNotice = document.querySelector('.health-notice');
const audioHeartBeat = audioSprite.heart_beat;
const audioDamage = [
  audioSprite.damage1,
  audioSprite.damage2,
  audioSprite.damage3
];
const audioHeal = [
  audioSprite.heal1,
  audioSprite.heal2
];

let healthNoticeTimerID;

function damage() {
  healthAnimation('health-damage');
  noise(audioURI, audioHeartBeat);
  noise(audioURI, audioDamage);
}

function regeneration() {
  healthAnimation('health-regeneration');
  noise(audioURI, audioHeal);
}

function healthAnimation(animationName) {
  clearTimeout(healthNoticeTimerID);
  $healthNotice.style.animationName = animationName;
  healthNoticeTimerID = setTimeout(healthAnimationEnd, 600);
}

function healthAnimationEnd() {
  $healthNotice.style.animationName = '';
}

function gameOver() {
  clearTimeout(healthNoticeTimerID);
  noise(audioURI, audioSprite.death);

  $healthNotice.style.animationName = '';
  $healthNotice.classList.add('game-over');
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
