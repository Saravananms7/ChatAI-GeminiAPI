import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const API_KEY = process.env.GOOGLE_API_KEY;

app.post('/chat', async (req, res) => {
  try {
    const { chat, model } = req.body;

    if (!chat || !model) {
      return res.status(400).json({ error: "Missing 'chat' or 'model' in request body." });
    }

    const endpoint = `${BASE_URL}/${model}:generateContent?key=${API_KEY}`;

    const response = await axios.post(
      endpoint,
      {
        contents: [
          {
            parts: [{ text: chat }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    res.json({ response: output });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch response from Gemini API" });
  }
});

app.listen(3600, () => {
  console.log('Server running on http://localhost:3600');
});
