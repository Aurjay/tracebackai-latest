
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5edM6PoqUzZm-eK1savgCLAnKa240dpU",

  authDomain: "traceback-ai-43af3.firebaseapp.com",

  projectId: "traceback-ai-43af3",

  storageBucket: "traceback-ai-43af3.appspot.com",

  messagingSenderId: "75382777607",

  appId: "1:75382777607:web:6379bf23dc70fc284847a2",

  measurementId: "G-F4H9F75GXN"

};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
