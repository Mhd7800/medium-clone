// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, onAuthStateChanged,signInWithPopup} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-68CCpTB8d00p-DMci1lePFvCgi8Ff0E",
  authDomain: "medium-clone-3c1d7.firebaseapp.com",
  projectId: "medium-clone-3c1d7",
  storageBucket: "medium-clone-3c1d7.appspot.com",
  messagingSenderId: "12287406303",
  appId: "1:12287406303:web:214fc32e132c6bd758396a",
  measurementId: "G-NPF72YY6Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, onAuthStateChanged };