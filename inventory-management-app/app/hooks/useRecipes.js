import { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { UserAuth } from "../context/AuthContext";

export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const {user} = UserAuth();
  
  const fetchRecipes= async () => {
    if (!user) return;

    const recipesRef = collection(db, 'users', user.uid, 'recipes');
    const recipeSnap = await getDocs(recipesRef);
  
    const recipesList = recipeSnap.docs.map(doc => ({
      name: doc.id,
      ...doc.data(),
    }));
    setRecipes(recipesList);
  };


  useEffect(() => {
    fetchRecipes();
  }, [user]);

  const addRecipe = async (title, ingredients, instructions) => {
  if (!user) return;

  const itemRef = doc(db, 'users', user.uid, 'recipes', title);
  await setDoc(itemRef, {title: title,  ingredients:ingredients, instructions:instructions });

  fetchRecipes();
};

  const removeRecipe = async (title) => {
    const itemRef = doc(db, 'users', user.uid, 'recipes', title);
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const { count } = itemSnap.data();
      await deleteDoc(itemRef);
    }
    await fetchRecipes();
  };

  const fetchRecipeItem = async (title) => {
        const itemRef = doc(db, 'users', user.uid, 'recipes', title);
        const itemSnap = await getDoc(itemRef);
        if (itemSnap.exists()) {
          return itemSnap.data();
        }
        return null;
  }
  return { recipes, addRecipe, removeRecipe, fetchRecipeItem, fetchRecipes };
}