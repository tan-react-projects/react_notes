import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB-5v75kxIoH9NdIG7gS0gt2COKJogJRyI",
    authDomain: "notes-490b6.firebaseapp.com",
    databaseURL: "https://notes-490b6.firebaseio.com",
    projectId: "notes-490b6",
    storageBucket: "notes-490b6.appspot.com",
    messagingSenderId: "832262389486"
  };
  firebase.initializeApp(config);

  export default firebase;