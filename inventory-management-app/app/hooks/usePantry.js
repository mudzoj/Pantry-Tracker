import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

export function usePantry() {
  const [pantry, setPantry] = useState([]);

  const fetchPantry = async () => {
    const q = query(collection(db, 'pantry'));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => ({ name: doc.id, ...doc.data() }));
    setPantry(list);
  };

  useEffect(() => {
    fetchPantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(db, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await fetchPantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(db, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await fetchPantry();
  };

  return { pantry, addItem, removeItem };
}