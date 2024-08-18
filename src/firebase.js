// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth, onAuthStateChanged,signInWithPopup, setPersistence, browserSessionPersistence} from 'firebase/auth';
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: "G-NPF72YY6Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

//setPersistence(auth, browserSessionPersistence)
  
const provider = new GoogleAuthProvider();

export const storage = getStorage(app)

export { auth, provider, onAuthStateChanged };