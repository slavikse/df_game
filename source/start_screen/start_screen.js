import noise from './../helper/noise';
import './auth';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $bestScoreFrame = $startScreen.querySelector('.best-score-frame'),
  $bestScore = $bestScoreFrame.querySelector('.best-score'),
  $newGame = $startScreen.querySelector('.new-game'),
  $guideHelp = $body.querySelector('.guide-help'),
  $guideWrap = $body.querySelector('.guide-wrap'),
  $panel = $body.querySelector('.panel'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),
  audioURI = window.audioURI,
  audioIntro = window.audioSprite.intro,
  eventStartGame = new Event('startGame');

initStartScreen();

function initStartScreen() {
  getBestScore();
}

function getBestScore() {
  $bestScore.textContent = localStorage.getItem('best-score') || 0;
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
  document.removeEventListener('keyup', initGame);

  $guideHelp.style.opacity = 0;
  $guideWrap.style.opacity = 0;
  $bestScoreFrame.style.opacity = 0;
  $newGame.style.animationName = 'new-game';

  noise(audioURI, audioIntro);

  initInterface();

  setTimeout(initGameEnd, 500);
  setTimeout(changeBackground, 5500);
}

function initGameEnd() {
  $newGame.style.opacity = 0;

  $startScreen.remove();
  $guideHelp.remove();
  $guideWrap.remove();

  document.dispatchEvent(eventStartGame);
}

function changeBackground() {
  $body.style.backgroundImage = 'none'; // освобождаем память
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
}

function initInterface() {
  $panel.style.opacity = 1;
  $forestNight.style.opacity = 1;
}

function enterKeyHandler(e) {
  if (e.keyCode !== 13) {
    return;
  }

  initGame();
}

$newGame.addEventListener('click', initGame);
document.addEventListener('keyup', enterKeyHandler);
