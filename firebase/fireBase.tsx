import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBT0aDnvAP6T20XuljMupb_wqDP6jo7h8Y",
  authDomain: "winchat-ffcd7.firebaseapp.com",
  projectId: "winchat-ffcd7",
  storageBucket: "winchat-ffcd7.appspot.com",
  messagingSenderId: "538624653735",
  appId: "1:538624653735:web:7db3be0a001809025a9e82",
  measurementId: "G-GN056XHHHY"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);

export {db, auth, storage}