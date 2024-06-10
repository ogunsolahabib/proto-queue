// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA44nKdKco3zodi1Np0b-4r_sUbAqxa3GQ",
    authDomain: "protolyst-e2578.firebaseapp.com",
    projectId: "protolyst-e2578",
    storageBucket: "protolyst-e2578.appspot.com",
    messagingSenderId: "855502658682",
    appId: "1:855502658682:web:848789183c480e41396fc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

