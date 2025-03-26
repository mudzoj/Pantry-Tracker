// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA22CvR0CZuIkndv9q36QO2kW8R1ybIOXc",
  authDomain: "inventory-management-app-4e988.firebaseapp.com",
  projectId: "inventory-management-app-4e988",
  storageBucket: "inventory-management-app-4e988.firebasestorage.app",
  messagingSenderId: "8577657674",
  appId: "1:8577657674:web:c79c4a34bbca1a1836afb3",
  measurementId: "G-PHMVP95T7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);