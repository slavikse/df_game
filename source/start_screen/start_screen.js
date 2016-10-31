import noise from './../helper/noise';
import './../auth/auth';
import './../guide/guide';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $authShowToggle = $startScreen.querySelector('.auth-show-toggle'),
  $authWrap = $startScreen.querySelector('.auth-wrap'),
  $bestScoreFrame = $startScreen.querySelector('.best-score-frame'),
  $bestScore = $bestScoreFrame.querySelector('.best-score'),
  $newGame = $startScreen.querySelector('.new-game'),
  $guideHelp = $body.querySelector('.guide-help'),
  $guideWrap = $body.querySelector('.guide-wrap'),
  $panel = $body.querySelector('.panel'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),
  audioURI = window.audioURI,
  audioClick = window.audioSprite.hover_menu,
  audioIntro = window.audioSprite.intro,
  eventStartGame = new Event('startGame');

initStartScreen();

function initStartScreen() {
  getBestScore();
}

function getBestScore() {
  $bestScore.textContent = localStorage.getItem('best-score') || 0;
}

function hoverNewGame() {
  noise(audioURI, audioClick);
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

  noise(audioURI, audioIntro);
  hiddenElement();
  initInterface();

  setTimeout(initGameEnd, 500);
  setTimeout(changeBackground, 5500);
}

function hiddenElement() {
  $authShowToggle.classList.add('hide');
  $authWrap.classList.add('hide');

  $guideHelp.classList.add('hide');
  $guideWrap.classList.add('hide');

  $bestScoreFrame.classList.add('hide');
}

function initInterface() {
  $newGame.classList.add('new-game-start');
  $panel.style.opacity = 1;
  $forestNight.style.opacity = 1;
}

function initGameEnd() {
  $startScreen.remove();
  document.dispatchEvent(eventStartGame);
}

function changeBackground() {
  $body.style.backgroundImage = 'none'; // освобождаем память
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
}

$newGame.addEventListener('mouseover', hoverNewGame);
$newGame.addEventListener('click', initGame);
