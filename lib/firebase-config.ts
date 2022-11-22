// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8eIGiF6JZ9h4XQOT_Sl0TJLVtCrWx7So",
  authDomain: "my-project-login-367901.firebaseapp.com",
  projectId: "my-project-login-367901",
  storageBucket: "my-project-login-367901.appspot.com",
  messagingSenderId: "564585516138",
  appId: "1:564585516138:web:64e77f0feb75e5d9e58e13",
  measurementId: "G-KVF534NRXX"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);