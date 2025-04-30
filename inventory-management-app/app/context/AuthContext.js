"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    //Creating Firestore Pantry collection for logged in user
    const userDocRef = doc(db, 'users', result.user.uid);
    const userDocSnap = await getDoc(userDocRef);
    oi
    if (!userDocSnap.exists()) {
      // Create the document with an empty pantry
      await setDoc(userDocRef, { pantry: {} });
    } else {
      const userData = userDocSnap.data();
      if (!userData.hasOwnProperty('pantry')) {
        // Add the pantry field without affecting other data
        await setDoc(userDocRef, { pantry: {} }, { merge: true });
      }
    }
    
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};