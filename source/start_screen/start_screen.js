import catShow from './../cat/cat';
import './../enemy/enemy';
import './../panel/panel';
import shoot from './../shoot/shoot';
import noise from './../helper/noise';

const
  $body = document.querySelector('body'),
  $event = $body.querySelector('.event'),
  $bestScoreFrame = $body.querySelector('.best-score-frame'),
  $bestScore = $bestScoreFrame.querySelector('.best-score'),
  $startScreen = $body.querySelector('.start-screen'),
  $newGame = $startScreen.querySelector('.new-game'),
  $panel = $body.querySelector('.panel'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),
  eventStartGame = new Event('startGame');

$bestScore.textContent = localStorage.getItem('best-score') || 0;

function initGame() {
  $newGame.removeEventListener('click', initGame);

  $bestScoreFrame.style.animationName = 'new-game';
  $newGame.style.animationName = 'new-game';
  noise('audio/intro.mp3');

  initInterface();
  startGame();
}

function initInterface() {
  $panel.style.opacity = 1;
  $forestNight.style.opacity = 1;

  setTimeout(() => {
    $bestScoreFrame.style.opacity = 0;
    $newGame.style.opacity = 0;
  }, 800);

  setTimeout(() => {
    $startScreen.remove();
    window.addEventListener('click', shoot);
  }, 1000); // 200ms анимация
}

function startGame() {
  setTimeout(() => {
    $body.style.backgroundImage = 'none'; // освобождаем память
    $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
  }, 3000);

  catShow();
  $event.dispatchEvent(eventStartGame);
}

$newGame.addEventListener('click', initGame);
