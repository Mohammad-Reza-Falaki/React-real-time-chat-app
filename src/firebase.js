import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBF-kR0IDIO7kmANFAbR2bmn_2JDvYnLj8",
    authDomain: "falakichati.firebaseapp.com",
    projectId: "falakichati",
    storageBucket: "falakichati.appspot.com",
    messagingSenderId: "936877548669",
    appId: "1:936877548669:web:ecbc59909fbe4eee74fd14"
  }).auth();