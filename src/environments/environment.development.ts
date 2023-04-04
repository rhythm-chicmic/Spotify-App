import {getDatabase} from "firebase/database"
export const environment = {
  firebase: {
    projectId: 'spotify-clone-c20c4',
    appId: '1:801151119175:web:ead5575ec15d249518e662',
    databaseURL: 'https://spotify-clone-c20c4-default-rtdb.firebaseio.com',
    storageBucket: 'spotify-clone-c20c4.appspot.com',
    apiKey: 'AIzaSyBtMMMaVfjehZnIwN-HtgH7DCueCW48-R8',
    authDomain: 'spotify-clone-c20c4.firebaseapp.com',
    messagingSenderId: '801151119175',
    measurementId: 'G-TQFHNWD74H',
  },
    production: true,
   firebaseConfig :{
      databaseURL:  "https://spotify-clone-c20c4-default-rtdb.firebaseio.com/"
    }
  };
