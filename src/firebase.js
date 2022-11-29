import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5gHtnD5KUo8g3DNImKMZc-krfuRps3gM",
    authDomain: "my-portfolio-32ffa.firebaseapp.com",
    projectId: "my-portfolio-32ffa",
    storageBucket: "my-portfolio-32ffa.appspot.com",
    messagingSenderId: "730116914878",
    appId: "1:730116914878:web:afe999ab88fc8455cd28ef",
    measurementId: "G-3EF3X38F3S"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default fire;