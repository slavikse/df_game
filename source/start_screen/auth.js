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

  config = {
    apiKey: "AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE",
    authDomain: "dark-forest-1567c.firebaseapp.com",
    databaseURL: "https://dark-forest-1567c.firebaseio.com",
    storageBucket: "dark-forest-1567c.appspot.com",
    messagingSenderId: "877244196821"
  };

let
  isAuthShow = false,
  loginSave;

firebase.initializeApp(config);

$login.select();

function auth(e) {
  e.preventDefault();

  const
    authElem = document.forms.auth,
    login = authElem.login.value,
    password = authElem.password.value;

  loginSave = login;
  fbAuth(login, password);
}

function fbAuth(login, password) {
  firebase.auth()
  .createUserWithEmailAndPassword(login, password)
  .then(authSuccess)
  .catch(authError);
}

function authSuccess(auth) {
  window.uid = auth.uid;

  authShowToggle();
  $authShowToggle.textContent = `Привет ${loginSave}!`;

  console.log(auth.uid);
}

function authError(error) {
  console.warn(error.code, error.message);
}

// function login() {
//
// }

function authShowToggle() {
  if (isAuthShow) {
    isAuthShow = false;
    $authShowToggle.textContent = 'Вход';
  } else {
    isAuthShow = true;
    $authShowToggle.textContent = 'Закрыть';
  }

  $authShowToggle.classList.toggle('auth-show-toggle-down');
  $authWrap.classList.toggle('auth-wrap-show');
}

$submit.addEventListener('click', auth);
document.addEventListener('auth', auth);
$authShowToggle.addEventListener('click', authShowToggle);
