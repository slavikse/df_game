import fb from './../helper/fb';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';
import notify from './../notify/notify';

const $startScreen = document.querySelector('.start-screen');
const $authShow = $startScreen.querySelector('.auth-show');
const $authLoader = $authShow.querySelector('.auth-loader-js');
const $authUserName = $authShow.querySelector('.auth-user-name');
const $authOpener = $authShow.querySelector('.auth-opener');
const $authLogout = $authShow.querySelector('.auth-logout');
const $authWrap = $startScreen.querySelector('.auth-wrap');
const $authEmail = $startScreen.querySelector('.auth-email');
const $authSubmit = $startScreen.querySelector('.auth-submit');
const audioAuthHover = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const audioAuthIn = audioSprite.auth_in;
const audioAuthOut = audioSprite.auth_out;
const audioCancel = audioSprite.cancel;
const eventAuthBonus = new Event('authBonus');
const eventCloseGuide = new Event('closeGuide');

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
  $authLoader.classList.remove('loader');
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

  document.dispatchEvent(eventCloseGuide); // закроет гайд если открыт
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
  e.preventDefault();

  if (isAuthProgress) {
    return;
  }

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

  submitAnimateWaited();
  fbAuth(email, password);
}

function dataInCorrect() {
  noise(audioURI, audioCancel);
  notify({type: 'warn', message: 'Исправь данные!'});
  submitAnimate('auth-submit-error');
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

  submitAnimateEnd();
  authLoginAnimate();

  notify({type: 'info', message: 'Привет!'});
  submitAnimate('auth-submit-success');

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

  noise(audioURI, audioCancel);
  notify({type: 'error', message: 'Данные заняты!'});
  submitAnimate('auth-submit-error');
}

function submitAnimateWaited() {
  $authSubmit.style.animationName = 'auth-submit-waited';
}

function submitAnimate(animate) {
  $authSubmit.style.animationName = animate;
  setTimeout(submitAnimateEnd, 400);
}

function submitAnimateEnd() {
  $authSubmit.style.animationName = '';
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
    notify({type: 'info', message: '+1 обойма!'});
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
  notify({type: 'info', message: 'Пока!'});
}

function hoverAuthOpener() {
  noise(audioURI, audioAuthHover);
}

$authOpener.addEventListener('mouseover', hoverAuthOpener);
$authLogout.addEventListener('click', fbLogout);
document.addEventListener('startGame', getAuthBonus);
