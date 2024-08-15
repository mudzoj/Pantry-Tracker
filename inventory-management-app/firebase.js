import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "YOUR_API_KEY",
 authDomain: "inventory-management-app-4e988.firebaseapp.com",
 projectId: "inventory-management-app-4e988",
 storageBucket: "inventory-management-app-4e988.appspot.com",
 messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
 appId: "YOUR_APP_ID"
 };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {firestore, app};