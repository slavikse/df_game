import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/storage';

const fb = firebase.initializeApp({
  apiKey: 'AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE',
  authDomain: 'dark-forest-1567c.firebaseapp.com',
  databaseURL: 'https://dark-forest-1567c.firebaseio.com',
  storageBucket: 'dark-forest-1567c.appspot.com',
  messagingSenderId: '877244196821',
  authUser: 'firebase:authUser:AIzaSyCbo2nw-39rTK69JMaDbS-2mynfkyx_GSE:[DEFAULT]'
});

export default fb;
