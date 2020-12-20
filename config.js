import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDGiFlSplyt4HHwJs-VF6PUtcy8dtqvki4',
  authDomain: 'kartikey-c-71-project-f21ae.firebaseapp.com',
  databaseURL: 'https://kartikey-c-71-project-f21ae.firebaseio.com',
  projectId: 'kartikey-c-71-project-f21ae',
  storageBucket: 'kartikey-c-71-project-f21ae.appspot.com',
  messagingSenderId: '616095642608',
  appId: '1:616095642608:web:ffc2eede3bce352fe42335',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();