import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { UserAuth } from "../context/AuthContext";

export function usePantry() {
  const [pantry, setPantry] = useState([]);
  const {user} = UserAuth();
  
  const fetchPantry = async () => {
    if (!user) return;

    const pantryRef = collection(db, 'users', user.uid, 'pantry');
    const pantrySnap = await getDocs(pantryRef);
  
    const pantryList = pantrySnap.docs.map(doc => ({
      name: doc.id,
      ...doc.data(),
    }));
    console.log(pantryList)
    setPantry(pantryList);
  };


  useEffect(() => {
    fetchPantry();
  }, [user]);

  const addItem = async (item) => {
  if (!user) return;

  const itemRef = doc(db, 'users', user.uid, 'pantry', item);
  const itemSnap = await getDoc(itemRef);

  if (itemSnap.exists()) {
    const { count } = itemSnap.data();
    await setDoc(itemRef, { count: count + 1 });
  } else {
    await setDoc(itemRef, { count: 1 });
  }
  fetchPantry();
};

  const removeItem = async (item) => {
    const itemRef = doc(db, 'users', user.uid, 'pantry', item);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      if (count === 1) {
        await deleteDoc(itemRef);
      } else {
        await setDoc(itemRef, { count: count - 1 });
      }
    }
    await fetchPantry();
  };

  return { pantry, addItem, removeItem };
}