import { NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';
import admin from 'firebase-admin';

config(); // Load environment variables

// Safe Firebase Admin SDK initialization
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin credentials in environment variables.");
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export async function POST(request) {
  try {
    // Verify ID token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Extract pantry items from request
    const { pantryItems } = await request.json();

    if (!pantryItems || pantryItems.length === 0) {
      return NextResponse.json({ error: "No pantry items provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    // Fetch existing recipe titles to avoid duplicates
    const recipesRef = db.collection('users').doc(userId).collection('recipes');
    const snapshot = await recipesRef.get();
    const existingTitles = snapshot.docs.map(doc => doc.data().title?.toLowerCase?.() ?? '');

    const prompt = `Generate a detailed recipe using only these ingredients: ${pantryItems.join(", ")}. Include common pantry staples like spices, salt, pepper, oil, and water. Format response as: 'Title:', 'Ingredients:', 'Instructions:'. Ensure it's unique from: ${existingTitles.join(", ") || 'none'}. Title max 20 characters.`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey } }
    );

    const rawRecipe = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawRecipe) {
      return NextResponse.json({ error: "No recipe generated" }, { status: 500 });
    }

    // Parse recipe
    const formattedRecipe = { title: '', ingredients: [], instructions: [] };
    const lines = rawRecipe.split('\n').map(line => line.trim()).filter(Boolean);
    let currentSection = null;

    for (const line of lines) {
      if (!currentSection && line.match(/\*\*Title:\*\*/i)) {
        formattedRecipe.title = line.replace(/\*\*Title:\*\*/i, '').trim() || 'Untitled Recipe';
      } else if (line.match(/\*\*Ingredients:\*\*/i)) {
        currentSection = 'ingredients';
      } else if (line.match(/\*\*Instructions:\*\*/i)) {
        currentSection = 'instructions';
      } else if (currentSection === 'ingredients' && line.match(/^\*\s+/)) {
        formattedRecipe.ingredients.push(line.replace(/^\*\s+/, '').trim());
      } else if (currentSection === 'instructions' && line.match(/^\d+\.\s+/)) {
        formattedRecipe.instructions.push(line.replace(/^\d+\.\s+/, '').trim());
      }
    }

    if (!formattedRecipe.title) formattedRecipe.title = 'Generated Recipe';
    if (formattedRecipe.ingredients.length === 0) formattedRecipe.ingredients.push('No ingredients listed');
    if (formattedRecipe.instructions.length === 0) formattedRecipe.instructions.push('No instructions available');

    // Final duplicate title check
    if (existingTitles.includes(formattedRecipe.title.toLowerCase())) {
      return NextResponse.json({ error: "Duplicate recipe title generated" }, { status: 400 });
    }

    return NextResponse.json({ recipe: formattedRecipe });

  } catch (error) {
    console.error("Error in /api/recipes:", error);
    return NextResponse.json({ error: `Failed to generate recipe: ${error.message}` }, { status: 500 });
  }
}
