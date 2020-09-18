// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyACcKWQ-HbfhvKM3Q8e8tALH7zxe0Ebc04",
  authDomain: "rl-instagram-clone.firebaseapp.com",
  databaseURL: "https://rl-instagram-clone.firebaseio.com",
  projectId: "rl-instagram-clone",
  storageBucket: "rl-instagram-clone.appspot.com",
  messagingSenderId: "786844891061",
  appId: "1:786844891061:web:43df581026e983d7004bfc",
  measurementId: "G-CWF9ZBPXN0",
});

// Initialize Cloud Firestore through Firebase

const db = firebaseApp.firestore();

//Login , Logout , Create users...
const auth = firebase.auth();

//How we are going to upload a bunch of pics and store it.
const storage = firebase.storage();

export default db;
//export { db };
