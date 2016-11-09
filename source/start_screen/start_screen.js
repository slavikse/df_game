import fb from './../helper/fb';
import './../auth/auth';
import './../guide/guide';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $bestScore = $startScreen.querySelector('.best-score'),
  $newGame = $startScreen.querySelector('.new-game'),
  $ambient = $body.querySelector('.ambient'),
  $forestNight = $body.querySelector('.forest-night'),

  audioHover = audioSprite.hover_menu,
  audioIntro = audioSprite.intro,

  eventStartGame = new Event('startGame'),
  db = fb.database();

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  const uid = (user && user.uid) ? user.uid : null;
  getBestScore(uid);
}

function getBestScore(uid) {
  if (uid) {
    db.ref(uid)
    .once('value')
    .then(bestScore);
  } else {
    $bestScore.textContent = localStorage.getItem('best-score') || 0;
  }
}

function bestScore(snapshot) {
  if (snapshot.val() && snapshot.val().bestScore) {
    $bestScore.textContent = snapshot.val().bestScore;
  }
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

  $startScreen.classList.add('start-screen-no-events');
  $newGame.classList.add('new-game-start');

  changeBackground();

  document.dispatchEvent(eventStartGame);
  setTimeout(changeAmbient, 5500);
}

function changeBackground() {
  $startScreen.style.opacity = 0;
  $forestNight.style.opacity = 1;
}

function changeAmbient() {
  $body.style.backgroundImage = 'none'; // освобождаем память
  $ambient.setAttribute('src', 'audio/dark_ambient.mp3');
  $startScreen.remove();
}

function hoverNewGame() {
  noise(audioURI, audioHover);
}

$newGame.addEventListener('mouseover', hoverNewGame);
$newGame.addEventListener('click', initGame);
