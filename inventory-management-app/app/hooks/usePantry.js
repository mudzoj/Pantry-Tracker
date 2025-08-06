import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebase';
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';

export function usePantry() {
  const [pantry, setPantry] = useState([]);
  const { user } = UserAuth();

  const fetchPantry = useCallback(async () => {
    if (!user) return;

    const pantryRef = collection(db, 'users', user.uid, 'pantry');
    const pantrySnap = await getDocs(pantryRef);

    const pantryList = pantrySnap.docs.map((doc) => ({
      name: doc.id,
      ...doc.data(),
    }));

    setPantry(pantryList);
  }, [user]);

  useEffect(() => {
    fetchPantry();
  }, [fetchPantry]);

  const addItem = async (item, foodGroup, amount, unit, date) => {
    if (!user) return;

    const itemRef = doc(db, 'users', user.uid, 'pantry', item);
    await setDoc(itemRef, {
      group: foodGroup,
      expiry: date,
      unit: unit,
      amount: amount,
    });

    fetchPantry();
  };

  const removeItem = async (item) => {
    const itemRef = doc(db, 'users', user.uid, 'pantry', item);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      await deleteDoc(itemRef);
    }
    fetchPantry();
  };

  const fetchPantryItem = async (itemId) => {
    const itemRef = doc(db, 'users', user.uid, 'pantry', itemId);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      return itemSnap.data();
    }
    return null;
  };

  return { pantry, addItem, removeItem, fetchPantryItem };
}
