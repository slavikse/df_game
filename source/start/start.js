import fb from 'helper/fb';
import {audioSprite, audioURI} from 'helper/audios';
import noise from 'helper/noise';
import 'auth/auth';
import 'guide/guide';
import 'donate/donate';

const db = fb.database();
const $body = document.body;
const $start = $body.querySelector('.start');
const $bestScore = $start.querySelector('.start__best-score-value');
const $newGame = $start.querySelector('.start__new-game');
const $ambient = $body.querySelector('.ambient');
const audioHover = audioSprite.hover_menu;
const audioIntro = audioSprite.start_intro;
const eventStartGame = new Event('startGame');

fb.auth().onAuthStateChanged(auth);

function auth(user) {
  if (user && user.email) {
    const name = user.email.replace(/@/g, ':').replace(/\./g, ':');
    db.ref(`user/${name}`).once('value').then(bestScore);
  } else {
    $bestScore.textContent = localStorage.getItem('best-score') || 0;
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

  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 191) { // ?
      window.god = true;
    }
  });

  /** / god mod */

  $newGame.removeEventListener('click', initGame);

  $start.classList.add('start__no-events');
  $newGame.style.animationName = 'start-new-game';

  noise(audioURI, audioIntro);
  $start.style.opacity = 0;

  setTimeout(changeAmbient, 4000);
  document.dispatchEvent(eventStartGame);
}

function changeAmbient() {
  $body.style.backgroundImage = 'none'; // освобождаем память
  $ambient.setAttribute('src', 'audio/start_dark_ambient.mp3');
  $start.remove();
}

function hoverNewGame() {
  noise(audioURI, audioHover);
}

$newGame.addEventListener('mouseenter', hoverNewGame);
$newGame.addEventListener('click', initGame);
