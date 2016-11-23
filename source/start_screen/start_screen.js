import fb from './../helper/fb';
import './../auth/auth';
import './../guide/guide';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $body = document.body;
const $startScreen = $body.querySelector('.start-screen');
const $bestScore = $startScreen.querySelector('.best-score');
const $newGame = $startScreen.querySelector('.new-game');
const $ambient = $body.querySelector('.ambient');
const $forestNight = $body.querySelector('.forest-night');
const audioHover = audioSprite.hover_menu;
const audioIntro = audioSprite.intro;
const eventStartGame = new Event('startGame');
const db = fb.database();

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  let uid = null;

  if (user && user.uid) {
    uid = user.uid;
  }

  getBestScore(uid);
}

function getBestScore(uid) {
  if (uid) {
    db.ref(uid).once('value').then(bestScore);
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
