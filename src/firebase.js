import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import "firebase/firestore";

const firebaseConfig = {
  
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default fire;
