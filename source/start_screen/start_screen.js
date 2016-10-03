import catShow from './../cat/cat';
import './../enemy/enemy';
import './../panel/panel';
import shoot from './../shoot/shoot';
import noise from './../helper/noise';

const
  $body = document.body,
  $event = $body.querySelector('.event'),
  $startScreen = $body.querySelector('.start-screen'),
  $nick = $startScreen.querySelector('.nick'),
  $bestScoreFrame = $startScreen.querySelector('.best-score-frame'),
  $bestScore = $bestScoreFrame.querySelector('.best-score'),
  $newGame = $startScreen.querySelector('.new-game'),
  $panel = $body.querySelector('.panel'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),
  eventStartGame = new Event('startGame');

initStartScreen();

function initStartScreen() {
  getNick();
  getBestScore();
}

function setNick() {
  let nick = $nick.value;
  localStorage.setItem('nick', nick);
}

function getNick() {
  const nick = localStorage.getItem('nick') || '';

  if (nick) {
    $nick.value = nick;
  }

  $nick.select();
}

function getBestScore() {
  $bestScore.textContent = localStorage.getItem('best-score') || 0;
}

function initGame() {
  $newGame.removeEventListener('click', initGame);
  window.removeEventListener('keyup', initGame);

  $nick.style.opacity = '0';
  $bestScoreFrame.style.opacity = '0';
  $newGame.style.animationName = 'new-game';
  noise('audio/intro.mp3');

  setNick();
  initInterface();
  startGame();
}

function initInterface() {
  $panel.style.opacity = 1;
  $forestNight.style.opacity = 1;

  setTimeout(() => {
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

function enterKeyHandler(e) {
  if (e.keyCode !== 13) {
    return;
  }

  initGame();
}

$newGame.addEventListener('click', initGame);
window.addEventListener('keyup', enterKeyHandler);
