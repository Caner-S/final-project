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

//firebase 2
/*const firebaseConfig = {
    apiKey: "AIzaSyCYWr3I9I8Fq8TIxH7WOJymKdxLmmBtq2E",
    authDomain: "final-project2-bbdb4.firebaseapp.com",
    projectId: "final-project2-bbdb4",
    storageBucket: "final-project2-bbdb4.appspot.com",
    messagingSenderId: "749573168813",
    appId: "1:749573168813:web:9845d9142d8b085637b024",
    measurementId: "G-36FBWMSTB1"
};*/


firebase.initializeApp(firebaseConfig);


export default firebase;
export const auth = firebase.auth();