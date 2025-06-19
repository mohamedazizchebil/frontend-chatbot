import axios from 'axios';

const API_KEY = "AIzaSyDaSPvvSUu_CertMXAJf-Xj1BJohcYYEfc";

export async function askGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;



  try {
    const response = await axios.post(url, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    console.log("Gemini Response:", response.data); 

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Réponse vide.";
    
    
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Erreur lors de la génération de la réponse.";
  }
}
