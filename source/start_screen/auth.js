import firebase from 'firebase/app.js';
import 'firebase/auth.js';
// import 'firebase/database';
// import 'firebase/storage';

const
  $body = document.body,
  $startScreen = $body.querySelector('.start-screen'),
  $login = $startScreen.querySelector('.login'),
  $submit = $startScreen.querySelector('.submit'),

  config = {
    apiKey: "AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE",
    authDomain: "dark-forest-1567c.firebaseapp.com",
    databaseURL: "https://dark-forest-1567c.firebaseio.com",
    storageBucket: "dark-forest-1567c.appspot.com",
    messagingSenderId: "877244196821"
  };

firebase.initializeApp(config);

$login.select();

function auth(e) {
  e.preventDefault();

  const
    authElem = document.forms.auth,
    login = authElem.login.value,
    password = authElem.password.value;

  fbAuth(login, password);
}

function fbAuth(login, password) {
  const unrealEmail = `${login}@gmail.com`;

  firebase.auth()
  .createUserWithEmailAndPassword(unrealEmail, password)
  .then(e => {
    console.log(e)
  })
  .catch(authError);
}

function authError(error) {
  console.warn(error.code, error.message);
}

// function login() {
//
// }

$submit.addEventListener('click', auth);
document.addEventListener('auth', auth);
