import fb from './../helper/fb';
import './../auth/auth';
import './../guide/guide';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const db = fb.database();
const $body = document.body;
const $startScreen = $body.querySelector('.start-screen');
const $bestScore = $startScreen.querySelector('.best-score');
const $newGame = $startScreen.querySelector('.new-game');
const $forestNight = $body.querySelector('.forest-night');
const $ambient = $body.querySelector('.ambient');
const audioHover = audioSprite.hover_menu;
const audioIntro = audioSprite.intro;
const eventStartGame = new Event('startGame');

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  if (user && user.email) {
    const name = user.email.replace('@', ':').replace('.', ':');
    db.ref(`user/${name}`).once('value').then(bestScore);
  } else {
    $bestScore.textContent = localStorage.getItem('score') || 0;
  }
}

function bestScore(snapshot) {
  if (snapshot.val() && snapshot.val().score) {
    $bestScore.textContent = snapshot.val().score;
  } else {
    $bestScore.textContent = 0;
  }
}

function initGame() {
  /** god mod */

  window.god = false;

  document.addEventListener('keyup', e => {
    if (e.keyCode === 191) { // ?
      window.god = true;
    }
  });

  /** / god mod */

  $newGame.removeEventListener('click', initGame);

  $startScreen.classList.add('start-screen-no-events');
  $newGame.style.animationName = 'new-game';

  noise(audioURI, audioIntro);
  changeBackground();

  document.dispatchEvent(eventStartGame);
  setTimeout(changeAmbient, 4000);
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

$newGame.addEventListener('mouseenter', hoverNewGame);
$newGame.addEventListener('click', initGame);
