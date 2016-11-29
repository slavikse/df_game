import fb from './../helper/fb';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const $startScreen = document.querySelector('.start-screen');
const $authShow = $startScreen.querySelector('.auth-show');
const $authLoader = $authShow.querySelector('.auth-loader-js');
const $authUserName = $authShow.querySelector('.auth-user-name');
const $authOpener = $authShow.querySelector('.auth-opener');
const $authLogout = $authShow.querySelector('.auth-logout');
const $authWrap = $startScreen.querySelector('.auth-wrap');
const $authCorrect = $startScreen.querySelector('.auth-correct');
const $authInCorrect = $startScreen.querySelector('.auth-incorrect');
const $authWrong = $startScreen.querySelector('.auth-wrong');
const $authEmail = $startScreen.querySelector('.auth-email');
const $authSubmit = $startScreen.querySelector('.auth-submit');
const audioAuthHover = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const audioAuthIn = audioSprite.auth_in;
const audioAuthOut = audioSprite.auth_out;
const audioCancel = audioSprite.cancel;
const eventAuthBonus = new Event('authBonus');

let authAudio;
let userName;
let isGetAuthBonus = false;
let emailSave;
let passwordSave;
let isAuthShow = false;
let isAuthProgress = false;

fb.auth().onAuthStateChanged(authChanged);

function authChanged(user) {
  if (user) {
    login(user);
  } else {
    logout();
  }

  //fix: Uncaught (in promise) DOMException: The play() request was interrupted
  // by a call to pause()
  setTimeout(noise.bind(null, audioURI, authAudio), 500);

  $authOpener.classList.remove('auth-opener-on');
  $authLoader.classList.remove('auth-loader');
}

function login(user) {
  isGetAuthBonus = true;

  authAudio = audioAuthIn;
  $authLogout.style.display = 'inline-block';

  $authSubmit.removeEventListener('click', auth);
  $authOpener.removeEventListener('click', authShowToggle);

  userName = getUserName(user);
  showUserName(userName);
}

function logout() {
  isGetAuthBonus = false;

  authAudio = audioAuthOut;
  $authLogout.style.display = '';

  $authSubmit.addEventListener('click', auth);
  $authOpener.addEventListener('click', authShowToggle);

  userName = '';
  showUserName(userName);
}

function getUserName(user) {
  const email = user.email;
  let name = '';

  if (email) {
    name = email.replace(/@.+/, ''); // remove @...
  }

  return name;
}

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    showUserName(userName);
  } else {
    isAuthShow = true;
    $authEmail.focus();
  }

  noise(audioURI, audioAuthShow);

  $startScreen.classList.toggle('start-screen-open');
  $authWrap.classList.toggle('auth-wrap-show');
  $authOpener.classList.toggle('auth-opener-on');
}

function showUserName(userName) {
  if (userName) {
    $authOpener.style.display = 'none';
    $authUserName.textContent = `Хaй ${userName}!`;
  } else {
    $authOpener.style.display = 'flex';
    $authUserName.textContent = '';
  }
}

function auth(e) {
  if (!isAuthProgress) {
    return;
  }

  e.preventDefault();

  const form = document.forms.auth;
  const email = form.email.value;
  const password = form.password.value;

  if (isDataCorrect(email, password)) {
    dataCorrect(email, password);
  } else {
    dataInCorrect();
  }
}

function isDataCorrect(email, password) {
  return (
    /^.{1,20}@.{1,6}\..{2,6}$/.test(email) &&
    /^.{6,30}$/.test(password)
  );
}

function dataCorrect(email, password) {
  emailSave = email;
  passwordSave = password;

  $authSubmit.style.animationName = 'auth-submit-waited';
  fbAuth(email, password);
}

function dataInCorrect() {
  $authSubmit.style.animationName = 'auth-submit-error';

  noise(audioURI, audioCancel);
  authNotify($authInCorrect);
}

function fbAuth(email, password) {
  isAuthProgress = true;

  fb.auth()
  .signInWithEmailAndPassword(email, password)
  .then(authSuccess)
  .catch(register);
}

function authSuccess() {
  isAuthProgress = false;

  $authSubmit.style.animationName = 'auth-submit-success';
  authNotify($authCorrect);
  authLoginAnimate();

  setTimeout(authShowToggle, 1200);
}

function register() {
  fb.auth()
  .createUserWithEmailAndPassword(emailSave, passwordSave)
  .then(authSuccess)
  .catch(authWrong);
}

/* когда email в базе, но пароль не подходит */
function authWrong() {
  isAuthProgress = false;
  $authSubmit.style.animationName = 'auth-submit-error';

  noise(audioURI, audioCancel);
  authNotify($authWrong);
}

function authNotify(notify) {
  notify.style.opacity = 1;

  setTimeout(notifyAnimateEnd, 400);
  setTimeout(notifyEnd.bind(null, notify), 1000);
}

function notifyAnimateEnd() {
  $authSubmit.style.animationName = '';
}

function notifyEnd(notify) {
  notify.style.opacity = 0;
}

function authLoginAnimate() {
  $authUserName.classList.add('auth-user-name-login');
  setTimeout(authLoginAnimateEnd, 600);
}

function authLoginAnimateEnd() {
  $authUserName.classList.remove('auth-user-name-login');
}

function getAuthBonus() {
  if (isGetAuthBonus) {
    document.dispatchEvent(eventAuthBonus);
  }
}

function fbLogout() {
  $authShow.classList.add('auth-show-logout');
  setTimeout(fbLogoutEnd, 300);
}

function fbLogoutEnd() {
  fb.auth().signOut();
  $authShow.classList.remove('auth-show-logout');
}

function hoverAuthOpener() {
  noise(audioURI, audioAuthHover);
}

$authOpener.addEventListener('mouseover', hoverAuthOpener);
$authLogout.addEventListener('click', fbLogout);
document.addEventListener('startGame', getAuthBonus);
