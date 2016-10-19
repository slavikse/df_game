// import firebase from 'firebase/app';
// import 'firebase/auth';
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
    // messagingSenderId: "877244196821"
  };

// firebase.initializeApp(config);
//
// function auth(e) {
//   firebase.auth()
//   .createUserWithEmailAndPassword(e.email, e.password)
//   .catch(authError);
// }
//
// function authError(error) {
//   console.warn(error);
// }
//
// document.addEventListener('auth', auth);

function auth(e) {
  e.preventDefault();

  console.log(
    document.forms.auth.login.value,
    document.forms.auth.password.value
  );

  // let login = $login.value || 'tester';
  // $login.select();

  // return login;
}
//
// function login() {
//
// }

$submit.addEventListener('click', auth);
