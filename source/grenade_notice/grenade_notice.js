import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $grenadeNotice = document.querySelector('.grenade-notice');
const audioGrenade = audioSprite.grenade;

function grenadeEffect() {
  $grenadeNotice.style.animationName = 'grenade-notice';
  noise(audioURI, audioGrenade);
  setTimeout(grenadeEffectEnd, 600); // анимация
}

function grenadeEffectEnd() {
  $grenadeNotice.style.animationName = '';
}

document.addEventListener('grenade', grenadeEffect);
