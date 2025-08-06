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
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { UserAuth } from "../context/AuthContext";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { user } = UserAuth();

  const fetchRecipes = useCallback(async () => {
    if (!user) return;

    const recipesRef = collection(db, 'users', user.uid, 'recipes');
    const q = query(recipesRef, orderBy("timestamp", "desc"));

    const recipeSnap = await getDocs(q);

    const recipesList = recipeSnap.docs.map(doc => ({
      name: doc.id,
      ...doc.data(),
    }));

    setRecipes(recipesList);
  }, [user]); // ✅ Recreate only when user changes

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]); // ✅ Now safely included

  const addRecipe = async (title, ingredients, instructions) => {
    if (!user) return;

    const itemRef = doc(db, 'users', user.uid, 'recipes', title);
    await setDoc(itemRef, {
      title,
      ingredients,
      instructions,
      timestamp: serverTimestamp(),
    });

    fetchRecipes();
  };

  const removeRecipe = async (title) => {
    const itemRef = doc(db, 'users', user.uid, 'recipes', title);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
      await deleteDoc(itemRef);
    }

    fetchRecipes();
  };

  const fetchRecipeItem = async (title) => {
    const itemRef = doc(db, 'users', user.uid, 'recipes', title);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
      return itemSnap.data();
    }

    return null;
  };

  return {
    recipes,
    addRecipe,
    removeRecipe,
    fetchRecipeItem,
    fetchRecipes,
  };
}
