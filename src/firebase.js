import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhjoY_XJAPsfZkbs0Irtxc9udLKNUkoDU",
    authDomain: "dolphin-54d24.firebaseapp.com",
    projectId: "dolphin-54d24",
    storageBucket: "dolphin-54d24.appspot.com",
    messagingSenderId: "431726158049",
    appId: "1:431726158049:web:e63dc89b65644b7b1257a0",
    measurementId: "G-4L149FTH3M"
  };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
