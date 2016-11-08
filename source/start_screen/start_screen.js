import './../auth/auth';
import './../guide/guide';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $bestScoreFrame = $startScreen.querySelector('.best-score-frame'),
  $bestScore = $bestScoreFrame.querySelector('.best-score'),
  $newGame = $startScreen.querySelector('.new-game'),
  $panel = $body.querySelector('.panel'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),

  audioHover = audioSprite.hover_menu,
  audioIntro = audioSprite.intro,

  eventStartGame = new Event('startGame');

initStartScreen();

function initStartScreen() {
  getBestScore();
}

function getBestScore() {
  $bestScore.textContent = localStorage.getItem('best-score') || 0;
}

function hoverNewGame() {
  noise(audioURI, audioHover);
}

function initGame() {
  /** god mod */

  window.god = false;

  document.addEventListener('keyup', e => {
    if (e.keyCode === 71) { // G
      window.god = true;
    }
  });

  /** / god mod */

  $newGame.removeEventListener('click', initGame);
  $newGame.classList.add('new-game-start');

  noise(audioURI, audioIntro);
  changeBackground();

  document.dispatchEvent(eventStartGame);
  setTimeout(changeAmbient, 5500);
}

function changeBackground() {
  $startScreen.style.opacity = 0;
  $forestNight.style.opacity = 1;

  setTimeout(changeBackgroundEnd, 800);
}

function changeBackgroundEnd() {
  $startScreen.remove();
}

function changeAmbient() {
  $body.style.backgroundImage = 'none'; // освобождаем память
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
}

$newGame.addEventListener('mouseover', hoverNewGame);
$newGame.addEventListener('click', initGame);
