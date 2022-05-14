import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCTYAYL98VPCAGZ0CZhgevvTRZw8ogPnTk",
    authDomain: "smit-19ac0.firebaseapp.com",
    projectId: "smit-19ac0",
    storageBucket: "smit-19ac0.appspot.com",
    messagingSenderId: "839868596735",
    appId: "1:839868596735:web:cb2d0829b1633b63b427ca",
    measurementId: "G-1XYTBJJVV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app);

export {firebaseConfig,auth,db};