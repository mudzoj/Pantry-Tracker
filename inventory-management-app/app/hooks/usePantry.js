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
    // console.log(pantryList)
    setPantry(pantryList);
  };


  useEffect(() => {
    fetchPantry();
  }, [user]);

  const addItem = async (item, foodGroup, amount, unit, date) => {
  if (!user) return;

  console.log("output")
  console.log(amount, date, unit, date)
  const itemRef = doc(db, 'users', user.uid, 'pantry', item);
  await setDoc(itemRef, {group: foodGroup,  expiry:date, unit: unit, amount: amount});

  fetchPantry();
};

  const removeItem = async (item) => {
    const itemRef = doc(db, 'users', user.uid, 'pantry', item);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      await deleteDoc(itemRef);
    }
    await fetchPantry();
  };

  return { pantry, addItem, removeItem };
}