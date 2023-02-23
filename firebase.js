// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,

  // apiKey: "AIzaSyAm_DB-68k5yM-1Ofze2kBA3KNjU5A0reg",
  // authDomain: "blogify-39540.firebaseapp.com",
  // projectId: "blogify-39540",
  // storageBucket: "blogify-39540.appspot.com",
  // messagingSenderId: "921767423307",
  // appId: "1:921767423307:web:7a932f14d282bc46df8cce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// db
export const db = getFirestore();
export const storage = getStorage();
