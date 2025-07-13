import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlBczaLRLYao3ev5SiIxw7_9BrwER-nzI",
  authDomain: "pustaka-digital-80cba.firebaseapp.com",
  projectId: "pustaka-digital-80cba",
  storageBucket: "pustaka-digital-80cba.appspot.com",
  messagingSenderId: "347076177769",
  appId: "1:347076177769:web:05e245fb23a67e4ccfd7f8",
  measurementId: "G-GQY65SL71W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
