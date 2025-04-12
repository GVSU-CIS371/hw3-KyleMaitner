import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLZgtEuufxvjHPilyV07mcyjY0DLNtYu0",
  authDomain: "brewandsavecloud.firebaseapp.com",
  projectId: "brewandsavecloud",
  storageBucket: "brewandsavecloud.firebasestorage.app",
  messagingSenderId: "79136800049",
  appId: "1:79136800049:web:c3541c788304d627074410",
  measurementId: "G-Z1WQBFGLKS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
