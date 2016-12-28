import fb from './../helper/fb';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';
import notify from './../notify/notify';
import range from 'libs/range';

const $startScreen = document.querySelector('.start-screen');
const $authShow = $startScreen.querySelector('.auth-show');
const $authLoader = $authShow.querySelector('.auth-loader-js');
const $authUserName = $authShow.querySelector('.auth-user-name');
const $authOpener = $authShow.querySelector('.auth-opener');
const $authLogout = $authShow.querySelector('.auth-logout');
const $authWrap = $startScreen.querySelector('.auth-wrap');
const $authEmail = $startScreen.querySelector('.auth-email');
const $authSubmitWrap = $startScreen.querySelector('.auth-submit-wrap');
const audioAuthHover = audioSprite.hover_menu;
const audioAuthShow = audioSprite.auth_show;
const audioAuthIn = audioSprite.auth_in;
const audioAuthOut = audioSprite.auth_out;
const audioCancel = audioSprite.cancel;
const authSymbols = ['⇝', '☀', '☄', '☆', '☘', '☢', '☣', '♒', '♕', '♔', '⚔', '⚘'];
const authSymbolsLength = authSymbols.length - 1;
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

  //Uncaught (in promise) DOMException: The play() request was interrupted
  //by a call to pause()
  setTimeout(noise.bind(null, audioURI, authAudio), 150);

  $authOpener.classList.remove('auth-opener-on');
  $authLoader.classList.remove('loader');
}

function login(user) {
  isGetAuthBonus = true;

  authAudio = audioAuthIn;
  $authLogout.style.display = 'inline-block';

  $authSubmitWrap.removeEventListener('click', auth);
  $authOpener.removeEventListener('click', authShowToggle);

  userName = getUserName(user);
  showUserName(userName);
}

function logout() {
  isGetAuthBonus = false;

  authAudio = audioAuthOut;
  $authLogout.style.display = '';

  $authSubmitWrap.addEventListener('click', auth);
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
  } else {
    isAuthShow = true;
    document.dispatchEvent(eventCloseGuide); // закроет гайд если открыт auth
    $authEmail.focus();
  }

  noise(audioURI, audioAuthShow);

  $startScreen.classList.toggle('start-screen-open');
  $authWrap.classList.toggle('auth-wrap-show');
  $authOpener.classList.toggle('auth-opener-on');
}

function showUserName(userName) {
  if (userName) {
    $authShow.classList.add('auth-show-open'); // вспомогательнай
    $authOpener.style.display = 'none';
    $authUserName.textContent = getRandomSymbol() + userName;
  } else {
    $authShow.classList.remove('auth-show-open');
    $authOpener.style.display = 'flex';
    $authUserName.textContent = '';
  }
}

function getRandomSymbol() {
  const random = range(0, authSymbolsLength);
  return authSymbols[random];
}

function auth(e) {
  e.preventDefault();

  if (!isAuthProgress) {
    canAuth();
  }
}

function canAuth() {
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
  notify({type: 'warn', message: '♿ исправь ♿'});
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

  notify({type: 'info', message: '☺ привет ☺'});
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
  notify({type: 'error', message: '☝ не твоё ☝'});
  submitAnimate('auth-submit-error');
}

function submitAnimateWaited() {
  $authSubmitWrap.style.animationName = 'auth-submit-waited';
}

function submitAnimate(animate) {
  $authSubmitWrap.style.animationName = animate;
  setTimeout(submitAnimateEnd, 400);
}

function submitAnimateEnd() {
  $authSubmitWrap.style.animationName = '';
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
    notify({type: 'info', message: '⚡ + обойма ⚡'});
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
  notify({type: 'info', message: '☹ пока ☹'});
}

function hoverAuthOpener() {
  noise(audioURI, audioAuthHover);
}

$authOpener.addEventListener('mouseenter', hoverAuthOpener);
$authLogout.addEventListener('click', fbLogout);
document.addEventListener('startGame', getAuthBonus);
