import { NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';

config(); // Load environment variables

export async function POST(request) {
  try {
    const { pantryItems } = await request.json();
    console.log("Received pantryItems:", pantryItems);

    if (!pantryItems || pantryItems.length === 0) {
      console.error("No pantry items provided");
      return NextResponse.json({ error: "No pantry items provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("GEMINI_API_KEY loaded:", !!apiKey);
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    const prompt = `Generate a detailed recipe using only these ingredients: ${pantryItems.join(", ")}. Include common pantry staples like salt, pepper, oil, and water if needed. Provide a title, ingredients list, and step-by-step instructions. Format the response with clear sections: 'Title:', 'Ingredients:', and 'Instructions:' followed by the respective content.`;
    console.log("Prompt:", prompt);

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
      }
    );

    console.log("Raw API response:", response.data);

    const rawRecipe = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawRecipe) {
      console.error("No recipe found in response:", response.data);
      return NextResponse.json({ error: "No recipe generated" }, { status: 500 });
    }

    console.log("Raw recipe text:", rawRecipe); // Debug the raw text

    // Flexible parsing with ** markers
    const formattedRecipe = {
      title: '',
      ingredients: [],
      instructions: []
    };

    const lines = rawRecipe.split('\n').map(line => line.trim()).filter(line => line);
    let currentSection = null;

    lines.forEach(line => {
      if (!currentSection && line.match(/\*\*Title:\*\*/i)) {
        formattedRecipe.title = line.replace(/\*\*Title:\*\*/i, '').trim() || 'Untitled Recipe';
        currentSection = null;
      } else if (line.match(/\*\*Ingredients:\*\*/i)) {
        currentSection = 'ingredients';
      } else if (line.match(/\*\*Instructions:\*\*/i)) {
        currentSection = 'instructions';
      } else if (currentSection) {
        // Handle bulleted or numbered items
        if (currentSection === 'ingredients' && line.match(/^\*\s+/)) {
          formattedRecipe.ingredients.push(line.replace(/^\*\s+/, '').trim());
        } else if (currentSection === 'instructions' && line.match(/^\d+\.\s+/)) {
          formattedRecipe.instructions.push(line.replace(/^\d+\.\s+/, '').trim());
        }
      }
    });

    // Fallback if sections are missing
    if (!formattedRecipe.title) formattedRecipe.title = 'Generated Recipe';
    if (formattedRecipe.ingredients.length === 0) formattedRecipe.ingredients = ['No ingredients listed'];
    if (formattedRecipe.instructions.length === 0) formattedRecipe.instructions = ['No instructions available'];

    console.log("Formatted recipe:", formattedRecipe);
    return NextResponse.json({ recipe: formattedRecipe });
  } catch (error) {
    console.error("Error in /api/recipes:", error.message, error.stack);
    if (error.response) {
      console.error("API Error Details:", error.response.data, error.response.status);
    }
    return NextResponse.json({ error: `Failed to generate recipe: ${error.message}` }, { status: 500 });
  }
}