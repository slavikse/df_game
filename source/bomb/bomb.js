import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $body = document.body,
  $bomb = $body.querySelector('.bomb'),
  audioBomb = audioSprite.bomb,
  eventBomb = new Event('bomb');

function bomb() {
  bombEffect();
  document.dispatchEvent(eventBomb);
}

function bombEffect() {
  $bomb.style.animationName = 'bomb';
  noise(audioURI, audioBomb);

  setTimeout(bombEffectEnd, 600); // анимация
}

function bombEffectEnd() {
  $bomb.style.animationName = '';
}

function BKeyHandler(e) {
  if (e.keyCode === 66) {
    bomb();
  }
}

function addListenKey() {
  document.addEventListener('keyup', BKeyHandler);
}

function removeListenKey() {
  document.removeEventListener('keyup', BKeyHandler);
}

document.addEventListener('startGame', addListenKey);
document.addEventListener('waveStart', addListenKey);
document.addEventListener('waveEnd', removeListenKey);
document.addEventListener('gameOver', removeListenKey);
