import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAgDsnArSI82ySdb-NWLsPsI7MOKsLaO4A",
  authDomain: "pruebas-para-login.firebaseapp.com",
  projectId: "pruebas-para-login",
  storageBucket: "pruebas-para-login.appspot.com",
  messagingSenderId: "671153242053",
  appId: "1:671153242053:web:536b3128d59c762c0015ac",
  measurementId: "G-VMGNMJK3E4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)