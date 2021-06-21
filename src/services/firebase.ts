import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDsKwUyNPUp9yh8FdEpJHdM6aDD76HZX2o",
    authDomain: "letmeask-cledson.firebaseapp.com",
    databaseURL: "https://letmeask-cledson-default-rtdb.firebaseio.com",
    projectId: "letmeask-cledson",
    storageBucket: "letmeask-cledson.appspot.com",
    messagingSenderId: "640837899870",
    appId: "1:640837899870:web:f5774ef8fcbefca5f9c6cf"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();