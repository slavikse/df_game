import noise from './../helper/noise';

const
  $body = document.body,
  $bomb = $body.querySelector('.bomb'),
  audioURI = window.audioURI,
  audioBomb = window.audioSprite.bomb,
  eventBomb = new Event('bomb');

function bomb() {
  document.dispatchEvent(eventBomb);
  bombEffect();
}

function bombEffect() {
  $bomb.style.animationName = 'bomb';
  noise(audioURI, audioBomb);
  setTimeout(bombEffectEnd, 1000); // анимация
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
