
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSWPoEqKujrHVMixuEoSnBQQtnmH56NK0",
  authDomain: "trail-ml-firebase.firebaseapp.com",
  projectId: "trail-ml-firebase",
  storageBucket: "trail-ml-firebase.appspot.com",
  messagingSenderId: "979900479995",
  appId: "1:979900479995:web:b30268582f587ae467b35e",
  measurementId: "G-W0VQSTXDSJ"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);