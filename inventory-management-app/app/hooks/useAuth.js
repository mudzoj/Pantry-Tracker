"use client"
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            try{
                await signInWithPopup(auth, provider);
            }catch(error){
            }
            
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign out error:", error);
            throw error;
        }
    };

    return {
        user,
        loading,
        handleGoogleSignIn,
        handleSignOut
    };
};