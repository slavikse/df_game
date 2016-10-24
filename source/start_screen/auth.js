import noise from './../helper/noise';
import firebase from 'firebase/app';
import 'firebase/auth.js';
// import 'firebase/database';
// import 'firebase/storage';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $authWrap = $startScreen.querySelector('.auth-wrap'),
  $authShowToggle = $startScreen.querySelector('.auth-show-toggle'),
  $login = $startScreen.querySelector('.login'),
  $submit = $startScreen.querySelector('.submit'),
  audioURI = window.audioURI,
  audioClick = window.audioSprite.menu_click,

  config = {
    apiKey: "AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE",
    authDomain: "dark-forest-1567c.firebaseapp.com",
    databaseURL: "https://dark-forest-1567c.firebaseio.com",
    storageBucket: "dark-forest-1567c.appspot.com",
    messagingSenderId: "877244196821",
    authUser: 'firebase:authUser:AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE:[DEFAULT]'
  };

let
  isAuthShow = false,
  logInName;

firebase.initializeApp(config);

isLogin();

function isLogin() {
  logInName = localStorage.getItem('name');

  if (logInName) {
    setExistName();
  }
}

function setExistName() {
  $authShowToggle.textContent = logInName ? `Хaй ${logInName}!` : 'Заходи';
}

function auth(e) {
  e.preventDefault();

  const
    form = document.forms.auth,
    login = form.login.value,
    password = form.password.value;

  logInName = login;

  fbAuth(login, password);
}

function fbAuth(login, password) {
  const email = `${login}@gmail.com`;

  firebase.auth()
  .createUserWithEmailAndPassword(email, password)
  .then(authSuccess)
  .catch(authError);
}

function authSuccess() {
  localStorage.setItem('name', logInName);

  authShowToggle();
}

function authError(error) {
  console.warn(error.code, error.message);
}

function hoverNewGame() {
  noise(audioURI, audioClick);
}

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    setExistName();
  } else {
    $login.focus();
    isAuthShow = true;
    $authShowToggle.textContent = 'Скрыть';
  }

  $authWrap.classList.toggle('auth-wrap-show');
}

$authShowToggle.addEventListener('mouseover', hoverNewGame);
$submit.addEventListener('mouseover', hoverNewGame);
$submit.addEventListener('click', auth);
$authShowToggle.addEventListener('click', authShowToggle);
