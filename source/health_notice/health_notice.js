import {audioURI, audioSprite} from '../helper/audio_sprite';
import noise from '../helper/noise';

const $healthDamage = document.querySelector('.health-damage');
const $healthRegeneration = document.querySelector('.health-regeneration');
const $healthGameOver = document.querySelector('.health-game-over');
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
  healthAnimation($healthDamage, 'health-damage');
  noise(audioURI, audioHeartBeat);
  noise(audioURI, audioDamage);
}

function regeneration() {
  healthAnimation($healthRegeneration, 'health-regeneration');
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
  noise(audioURI, audioSprite.death);
  clearTimeout(healthNoticeTimerID);

  $healthGameOver.style.animationName = 'health-game-over';
}

document.addEventListener('damage', damage);
document.addEventListener('regeneration', regeneration);
document.addEventListener('gameOver', gameOver);
