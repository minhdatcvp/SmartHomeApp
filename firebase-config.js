import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// Optionally import the services that you want to use
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAbnMibnQjVKN_MbXynvf9RcNMvxy3WAo",
  authDomain: "lightcontrol-30329.firebaseapp.com",
  databaseURL: "https://lightcontrol-30329-default-rtdb.firebaseio.com",
  projectId: "lightcontrol-30329",
  storageBucket: "lightcontrol-30329.appspot.com",
  messagingSenderId: "228687170557",
  appId: "1:228687170557:web:9042931fd4a800f4b46794",
  measurementId: "G-XF8SDTC8WB"
};

let myApp = initializeApp(firebaseConfig);
const auth = getAuth(myApp);
const db = getDatabase(myApp);
export { auth }
export { db }