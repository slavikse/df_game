import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';

const $healthDamage = document.querySelector('.health-notice__damage');
const $healthRegeneration = document.querySelector('.health-notice__regeneration');
const $healthGameOver = document.querySelector('.health-notice__game-over');
const audioHeartBeat = audioSprite.health_heart_beat;
const audioDamage = [
  audioSprite.health_damage1,
  audioSprite.health_damage2,
  audioSprite.health_damage3
];
const audioHeal = [
  audioSprite.health_heal1,
  audioSprite.health_heal2
];

let healthNoticeTimerID;

function damage() {
  healthAnimation($healthDamage, 'health-notice-damage');
  noise(audioURI, audioHeartBeat);
  noise(audioURI, audioDamage);
}

function regeneration() {
  healthAnimation($healthRegeneration, 'health-notice-regeneration');
  noise(audioURI, audioHeal);
}

function healthAnimation(node, animationName) {
  clearTimeout(healthNoticeTimerID);
  node.style.animationName = animationName;
  healthNoticeTimerID = setTimeout(healthAnimationEnd.bind(null, node), 600);
}

function healthAnimationEnd(node) {
  node.style.animationName = '';
}

function gameOver() {
  noise(audioURI, audioSprite.health_death);
  clearTimeout(healthNoticeTimerID);

  $healthGameOver.style.animationName = 'health-notice-game-over';
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
