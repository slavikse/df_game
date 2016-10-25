import noise from './../helper/noise';
import firebase from 'firebase/app';
import 'firebase/auth.js';
// import 'firebase/database';
// import 'firebase/storage';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $authLoader = $startScreen.querySelector('.auth-loader-js'),
  $authWrap = $startScreen.querySelector('.auth-wrap'),
  $email = $startScreen.querySelector('.email'),
  $password = $startScreen.querySelector('.password'),
  $submit = $startScreen.querySelector('.submit'),
  $authShowToggle = $startScreen.querySelector('.auth-show-toggle'),
  $logout = $startScreen.querySelector('.logout'),
  audioURI = window.audioURI,
  audioHoverMenu = window.audioSprite.hover_menu,

  config = {
    apiKey: "AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE",
    authDomain: "dark-forest-1567c.firebaseapp.com",
    databaseURL: "https://dark-forest-1567c.firebaseio.com",
    storageBucket: "dark-forest-1567c.appspot.com",
    messagingSenderId: "877244196821",
    authUser: 'firebase:authUser:AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE:[DEFAULT]'
  };

let
  emailSave,
  passwordSave,
  isAuthShow = false,
  loginName;

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(authChanged);

function authChanged(user) {
  if (user) {
    $logout.classList.add('logout-active');
    $authShowToggle.removeEventListener('mouseover', hoverMenu);
    $authShowToggle.removeEventListener('click', authShowToggle);
    $authShowToggle.classList.remove('auth-show-toggle-active');
  } else {
    $logout.classList.remove('logout-active');
    $authShowToggle.addEventListener('mouseover', hoverMenu);
    $authShowToggle.addEventListener('click', authShowToggle);
    $authShowToggle.classList.add('auth-show-toggle-active');
  }

  $authLoader.classList.remove('auth-loader');
  setExistName();
}

function logout() {
  loginName = '';
  localStorage.removeItem('name');
  firebase.auth().signOut();
}

function setExistName() {
  loginName = localStorage.getItem('name');
  $authShowToggle.textContent = loginName ? `Хaй ${loginName}!` : 'Войти';
}

function auth(e) {
  e.preventDefault();

  const
    form = document.forms.auth,
    email = form.email.value,
    password = form.password.value;

  if (checkValid(email, password)) {
    submitAnimateError();
    return;
  }

  emailSave = email;
  passwordSave = password;

  $submit.style.animationName = 'auth-submit-waited';
  fbAuth(email, password);
}

function checkValid(email, password) {
  if (
    /.+@.+\..+/.test(email) &&
    /[a-zA-Z0-9]{6,}/.test(password)
  ) {
    return false;
  }

  return true;
}

function fbAuth(email, password) {
  firebase.auth()
  .signInWithEmailAndPassword(email, password)
  .then(authSuccess)
  .catch(signInError);
}

function signInError() {
  // authLoginError();

  firebase.auth()
  .createUserWithEmailAndPassword(emailSave, passwordSave)
  .then(authSuccess)
  .catch(authPasswordError);
}

function authSuccess() {
  $submit.style.animationName = '';

  loginName = loginName.replace(/@.+/, ''); // - @gmail.com
  localStorage.setItem('name', loginName);

  authShowToggle();
}

// function authLoginError() {
//   $email.select();
//   submitAnimateError();
// }

function authPasswordError() {
  $password.select();
  submitAnimateError();
}

function submitAnimateError() {
  $submit.style.animationName = 'auth-submit-error';

  setTimeout(authErrorAnimateEnd, 400);
}

function authErrorAnimateEnd() {
  $submit.style.animationName = '';
}

function hoverMenu() {
  noise(audioURI, audioHoverMenu);
}

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    setExistName();
  } else {
    isAuthShow = true;
    $email.focus();
    $authShowToggle.textContent = 'Скрыть';
  }

  $authWrap.classList.toggle('auth-wrap-show');
}

$submit.addEventListener('mouseover', hoverMenu);
$submit.addEventListener('click', auth);
$logout.addEventListener('mouseover', hoverMenu);
$logout.addEventListener('click', logout);
