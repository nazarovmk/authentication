import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIM3Q2-ld7ACmSiVDE688HcrTaugN0FFg",
  authDomain: "users-dacbf.firebaseapp.com",
  projectId: "users-dacbf",
  storageBucket: "users-dacbf.firebasestorage.app",
  messagingSenderId: "266196950035",
  appId: "1:266196950035:web:6cbcf66caae83cc4cbb3e6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
