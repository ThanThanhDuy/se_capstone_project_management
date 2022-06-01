import firebase from "firebase/compat/app"; // version 9
import "firebase/compat/auth";
// vercel
const firebaseConfig = {
  apiKey: "AIzaSyBds-Fo2CH6nhfCJHHXFrJD7-AEuiczSN4",
  authDomain: [
    "se-capstone-project-management.firebaseapp.com",
    "se-capstone-project-management.vercel.app"
  ],
  projectId: "se-capstone-project-management",
  storageBucket: "se-capstone-project-management.appspot.com",
  messagingSenderId: "336488913408",
  appId: "1:336488913408:web:eaf4fa9ba441c2ea81d6e5"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
