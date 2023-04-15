// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFSGunDFWF1lcjmEysDf234L57hYIDOzw",
  authDomain: "tua-website-1681296175377.firebaseapp.com",
  projectId: "tua-website-1681296175377",
  storageBucket: "tua-website-1681296175377.appspot.com",
  messagingSenderId: "31744863114",
  appId: "1:31744863114:web:b992c8bd2c20fd6a72f673",
  measurementId: "G-QT5N2GE2Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);