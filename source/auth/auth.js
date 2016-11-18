import fb from './../helper/fb.js';
import {audioURI, audioSprite} from './../helper/audio_sprite.js';
import noise from './../helper/noise.js';

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
const $authSubmit = $startScreen.querySelector('.auth-submit');
const audioAuthHover = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const audioAuthIn = audioSprite.auth_in;
const audioAuthOut = audioSprite.auth_out;
const audioCancel = audioSprite.cancel;
const eventAuthBonus = new Event('authBonus');

let userName;
let isGetAuthBonus = false;
let emailSave;
let passwordSave;
let isAuthShow = false;
let isAuthProgress = false;

fb.auth().onAuthStateChanged(authChanged);

function authChanged(user) {
  let authAudio;

  if (user) {
    authAudio = audioAuthIn;

    $authSubmit.removeEventListener('click', auth);
    $authOpener.removeEventListener('click', authShowToggle);
    $authLogout.style.display = 'inline-block';

    if (!isGetAuthBonus) {
      document.dispatchEvent(eventAuthBonus);
    }

    isGetAuthBonus = true;

    userName = getUserName(user);
    showUserName(userName);
  } else {
    authAudio = audioAuthOut;

    $authSubmit.addEventListener('click', auth);
    $authOpener.addEventListener('click', authShowToggle);
    $authLogout.style.display = '';

    showUserName();
  }

  //fix: Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()
  setTimeout(noise.bind(null, audioURI, authAudio), 100);

  $authOpener.classList.remove('auth-opener-on');
  $authLoader.classList.remove('auth-loader');

}

function getUserName(user) {
  const name = (user && user.email) ? user.email : null;
  return name.replace(/@.+/, ''); // remove @...
}

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    showUserName(userName);
  } else {
    isAuthShow = true;
  }

  noise(audioURI, audioAuthShow);

  $startScreen.classList.toggle('start-screen-shading');
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
  e.preventDefault();

  if (isAuthProgress) {
    return;
  }

  const form = document.forms.auth;
  const email = form.email.value;
  const password = form.password.value;

  if (!dataCorrect(email, password)) {
    $authSubmit.style.animationName = 'auth-submit-error';

    noise(audioURI, audioCancel);
    authNotify($authInCorrect);

    return;
  }

  emailSave = email;
  passwordSave = password;

  $authSubmit.style.animationName = 'auth-submit-waited'; // анимация ожидания входа
  fbAuth(email, password);
}

function dataCorrect(email, password) {
  if ((
    /^.{1,20}@.{1,6}\..{2,6}$/.test(email) &&
    /^.{6,30}$/.test(password))
  ) {
    return true;
  }

  return false;
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

function logout() {
  authLogoutAnimate();
  setTimeout(logoutEnd, 300);
}

function logoutEnd() {
  fb.auth().signOut();
}

function authLogoutAnimate() {
  $authShow.classList.add('auth-show-logout');
  setTimeout(authLogoutAnimateEnd, 300);
}

function authLogoutAnimateEnd() {
  $authShow.classList.remove('auth-show-logout');
}

function hoverAuthOpener() {
  noise(audioURI, audioAuthHover);
}

$authOpener.addEventListener('mouseover', hoverAuthOpener);
$authLogout.addEventListener('click', logout);
