// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAsFbeH2joAazp6F75CJgpJIhiQD7cgt9g",
  authDomain: "rl-instagram-clone-369c9.firebaseapp.com",
  databaseURL: "https://rl-instagram-clone-369c9.firebaseio.com",
  projectId: "rl-instagram-clone-369c9",
  storageBucket: "rl-instagram-clone-369c9.appspot.com",
  messagingSenderId: "466209378570",
  appId: "1:466209378570:web:e3dbe5f6e9468183722af3",
  measurementId: "G-J63RDDR0YZ",
});

// Initialize Cloud Firestore through Firebase

const db = firebaseApp.firestore();

//Login , Logout , Create users...
const auth = firebase.auth();

//How we are going to upload a bunch of pics and store it.
const storage = firebase.storage();

//export default db;
export { db, auth, storage };
