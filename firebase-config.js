// firebase-config.js
// Este archivo asume que ya cargaste los scripts CDN de Firebase en tu HTML

const firebaseConfig = {
  apiKey: "AIzaSyBbx48s2XeGazJRrMF_gwrr15IHhxDnA8k",
  authDomain: "proyect-firebase-f76be.firebaseapp.com",
  projectId: "proyect-firebase-f76be",
  storageBucket: "proyect-firebase-f76be.appspot.com",
  messagingSenderId: "439779325339",
  appId: "1:439779325339:web:1c9eba873f2c9c231a5d3e",
  measurementId: "G-DM2X2J8JK3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();