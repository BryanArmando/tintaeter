// Firebase App (the core Firebase SDK) is always required and must be listed first
// import { initializeApp } from "firebase/app";
//import firebase from "firebase/app"
// Add the Firebase products that you want to use
// import "firebase/auth";
//import { initializeApp } from 'firebase/app';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYAbqFHsK62GkF8joA-JnR9xiH9LWamXg",
  authDomain: "tinta-eterea.firebaseapp.com",
  databaseURL: "https://tinta-eterea-default-rtdb.firebaseio.com",
  projectId: "tinta-eterea",
  storageBucket: "tinta-eterea.appspot.com",
  messagingSenderId: "738204896695",
  appId: "1:738204896695:web:950cdbd67b2055a17f6c32",
  measurementId: "G-JRQ9YYL0B6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);
export const db = app.database();
export const auth = app.auth();
export const storage = app.storage();
export const db1 = app.firestore();
