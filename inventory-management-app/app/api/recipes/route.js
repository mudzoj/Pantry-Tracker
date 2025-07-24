import { NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';
import admin from 'firebase-admin';

config(); // Load environment variables

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export async function POST(request) {
  try {
    // Extract and verify the idToken
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }
    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid; // This is user.uid
    console.log("Authenticated user ID:", userId);

    // Get pantry items from request
    const { pantryItems } = await request.json();
    console.log("Received pantryItems:", pantryItems);

    if (!pantryItems || pantryItems.length === 0) {
      return NextResponse.json({ error: "No pantry items provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    // Fetch existing recipe titles from Firestore
    const recipesRef = db.collection('users').doc(userId).collection('recipes');
    const snapshot = await recipesRef.get();
    const existingTitles = snapshot.docs.map(doc => doc.data().title.toLowerCase());
    console.log("Existing recipe titles:", existingTitles);

    // Update prompt to avoid duplicates
    const prompt = `Generate a detailed recipe using only these ingredients: ${pantryItems.join(", ")}. Include common pantry staples like salt, pepper, oil, and water if needed. Provide a title, ingredients list, and step-by-step instructions. Format the response with clear sections: 'Title:', 'Ingredients:', and 'Instructions:' followed by the respective content. Ensure the title is unique and not one of the following: ${existingTitles.join(", ") || 'none'}.`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey } }
    );

    const rawRecipe = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawRecipe) {
      return NextResponse.json({ error: "No recipe generated" }, { status: 500 });
    }

    // Parse the recipe (unchanged from your code)
    const formattedRecipe = { title: '', ingredients: [], instructions: [] };
    const lines = rawRecipe.split('\n').map(line => line.trim()).filter(line => line);
    let currentSection = null;

    lines.forEach(line => {
      if (!currentSection && line.match(/\*\*Title:\*\*/i)) {
        formattedRecipe.title = line.replace(/\*\*Title:\*\*/i, '').trim() || 'Untitled Recipe';
      } else if (line.match(/\*\*Ingredients:\*\*/i)) {
        currentSection = 'ingredients';
      } else if (line.match(/\*\*Instructions:\*\*/i)) {
        currentSection = 'instructions';
      } else if (currentSection) {
        if (currentSection === 'ingredients' && line.match(/^\*\s+/)) {
          formattedRecipe.ingredients.push(line.replace(/^\*\s+/, '').trim());
        } else if (currentSection === 'instructions' && line.match(/^\d+\.\s+/)) {
          formattedRecipe.instructions.push(line.replace(/^\d+\.\s+/, '').trim());
        }
      }
    });

    // Fallbacks
    if (!formattedRecipe.title) formattedRecipe.title = 'Generated Recipe';
    if (formattedRecipe.ingredients.length === 0) formattedRecipe.ingredients = ['No ingredients listed'];
    if (formattedRecipe.instructions.length === 0) formattedRecipe.instructions = ['No instructions available'];

    // Check for duplicates
    if (existingTitles.includes(formattedRecipe.title.toLowerCase())) {
      return NextResponse.json({ error: "Duplicate recipe title generated" }, { status: 400 });
    }

    return NextResponse.json({ recipe: formattedRecipe });
  } catch (error) {
    console.error("Error in /api/recipes:", error.message);
    return NextResponse.json({ error: `Failed to generate recipe: ${error.message}` }, { status: 500 });
  }
}