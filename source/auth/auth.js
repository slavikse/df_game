import firebase from 'firebase/app';
import 'firebase/auth.js';
// import 'firebase/database';
// import 'firebase/storage';
import {audioURI, audioSprite} from './../helper/audio_sprite';
import noise from './../helper/noise';

const
  $startScreen = document.querySelector('.start-screen'),

  $authShow = $startScreen.querySelector('.auth-show'),
  $authLoader = $authShow.querySelector('.auth-loader-js'),
  $authUserName = $authShow.querySelector('.auth-user-name'),
  $authOpener = $authShow.querySelector('.auth-opener'),
  $authLogout = $authShow.querySelector('.auth-logout'),

  $authWrap = $startScreen.querySelector('.auth-wrap'),
  $authCorrect = $authWrap.querySelector('.auth-correct'),
  $authInCorrect = $authWrap.querySelector('.auth-incorrect'),
  $authWrong = $authWrap.querySelector('.auth-wrong'),
  $authSubmit = $authWrap.querySelector('.auth-submit'),

  audioAuthHover = audioSprite.hover_menu,
  audioAuthShow = audioSprite.auth_show,
  audioAuthIn = audioSprite.auth_in,
  audioAuthOut = audioSprite.auth_out,
  audioCancel = audioSprite.cancel,

  eventAuthBonus = new Event('authBonus'),

  fbConfig = {
    apiKey: 'AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE',
    authDomain: 'dark-forest-1567c.firebaseapp.com',
    databaseURL: 'https://dark-forest-1567c.firebaseio.com',
    storageBucket: 'dark-forest-1567c.appspot.com',
    messagingSenderId: '877244196821',
    authUser: 'firebase:authUser:AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE:[DEFAULT]'
  };

let
  emailSave,
  passwordSave,
  isAuthShow = false,
  isAuthProgress = false,
  loginName;

firebase.initializeApp(fbConfig);
firebase.auth().onAuthStateChanged(authChanged);

function authChanged(user) {
  let authAudio;

  if (user) {
    authAudio = audioAuthIn;

    $authSubmit.removeEventListener('click', auth);
    $authOpener.removeEventListener('click', authShowToggle);
    $authLogout.style.display = 'inline-block';

    document.dispatchEvent(eventAuthBonus);
  } else {
    authAudio = audioAuthOut;

    $authSubmit.addEventListener('click', auth);
    $authOpener.addEventListener('click', authShowToggle);
    $authLogout.style.display = '';
  }

  //TODO при входе в игру
  //Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause()
  noise(audioURI, authAudio);

  $authOpener.classList.remove('auth-opener-on');
  $authLoader.classList.remove('auth-loader');

  setExistName();
}

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    setExistName();
  } else {
    isAuthShow = true;
  }

  noise(audioURI, audioAuthShow);

  $startScreen.classList.toggle('start-screen-shading');
  $authWrap.classList.toggle('auth-wrap-show');
  $authOpener.classList.toggle('auth-opener-on');
}

function setExistName() {
  loginName = localStorage.getItem('name');

  if (loginName) {
    $authOpener.style.display = 'none';
    $authUserName.textContent = `Хaй ${loginName}!`;
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

  const
    form = document.forms.auth,
    email = form.email.value,
    password = form.password.value;

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

  firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then(authSuccess)
  .catch(register);
}

function authSuccess() {
  isAuthProgress = false;
  savePlayerName();

  $authSubmit.style.animationName = 'auth-submit-success';
  authNotify($authCorrect);
  authLoginAnimate();

  setTimeout(authShowToggle, 1200);
}

function savePlayerName() {
  loginName = emailSave.replace(/@.+/, ''); // remove @...
  localStorage.setItem('name', loginName);
}

function register() {
  firebase.auth()
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
  localStorage.removeItem('name');
  loginName = '';

  setTimeout(logoutEnd, 300);
}

function logoutEnd() {
  firebase.auth().signOut();
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
