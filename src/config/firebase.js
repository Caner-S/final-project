import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

//proper firebase
const firebaseConfig = {
    apiKey: "AIzaSyBVz0spNArJz6XxzF1bAUXdjWV1DN308iE",
    authDomain: "final-aston-project.firebaseapp.com",
    databaseURL: "https://final-aston-project.firebaseio.com",
    projectId: "final-aston-project",
    storageBucket: "final-aston-project.appspot.com",
    messagingSenderId: "113157273296",
    appId: "1:113157273296:web:b027a9a58734eda0c510d5",
    measurementId: "G-E9KPJ65JQZ"
};



firebase.initializeApp(firebaseConfig);


export default firebase;
export const auth = firebase.auth();