import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCUCvivCT-rtAlXdTYjBghRMyevWNocHVU",
  authDomain: "rest-api-teste.firebaseapp.com",
  databaseURL: "https://rest-api-teste-default-rtdb.firebaseio.com",
  projectId: "rest-api-teste",
  storageBucket: "rest-api-teste.appspot.com",
  messagingSenderId: "888474119057",
  appId: "1:888474119057:web:bf5c4c456805d453248830",
  measurementId: "G-PHLNBBRTR2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Pegar BD
const dataBase = getDatabase(app);

export { app, dataBase };
