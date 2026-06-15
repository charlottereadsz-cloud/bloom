import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import { masterPrompt } from "./prompts/masterPrompt.js";
import axios from "axios";
console.log(masterPrompt);

dotenv.config({ path: "./.env" });




const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
app.get("/", (req, res) => {
  res.json({
    message: "Playlist AI Server draait!",
  });
});

app.post("/api/generate-playlist", async (req, res) => {
  try {
    const { prompt } = req.body;

 const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: masterPrompt,
    },
    {
      role: "user",
      content: prompt,
    },
  ],
  model: "llama-3.3-70b-versatile",
});

const text = completion.choices[0].message.content;


const cleanText = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const playlist = JSON.parse(cleanText);

console.log(JSON.stringify(playlist, null, 2));

console.log(JSON.stringify(playlist, null, 2));

if (playlist.songs.length > 25)
  playlist.songs = playlist.songs.slice(0, 25);

if (playlist.songs.length < 25)
  throw Error("Invalid playlist");

res.json(playlist);

} catch (error) {
    
  console.error(error);

  res.status(500).json({
    error: "Failed to generate playlist",
  });
}
});
app.get("/api/spotify/login", (req, res) => {
  const scope = [
    "playlist-modify-public",
    "playlist-modify-private",
  ].join(" ");

  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope,
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${params}`
  );
});
app.listen(3001, () => {
  console.log("Server draait op poort 3001");
});