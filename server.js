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
console.log(process.env.SPOTIFY_REDIRECT_URI);  
console.log(
  "CLIENT ID:",
  process.env.SPOTIFY_CLIENT_ID
);
  const scope = [
    "playlist-modify-public",
    "playlist-modify-private",
  ].join(" ");
 console.log("SCOPES:", scope); 

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

app.get("/api/spotify/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri:
          process.env.SPOTIFY_REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken =
      response.data.access_token;

    res.redirect(
      `https://bloom-psi-henna.vercel.app/?spotify_token=${accessToken}`
    );
  } catch (error) {
    console.error(
      "Spotify callback error:",
      error.response?.data || error.message
    );

    res.status(500).send(
      "Spotify login failed"
    );
  }
});

app.get("/api/spotify/me", async (req, res) => {
  try {
    const token = req.headers.authorization
      ?.replace("Bearer ", "");

    const response = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    

    res.status(500).json({
      error: "Failed to get user",
    });
  }
});

app.post("/api/spotify/create-playlist", async (req, res) => {
  try {
    const token = req.headers.authorization
      ?.replace("Bearer ", "");

    const { name, description } = req.body;

    const me = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userId = me.data.id;

   const playlist = await axios.post(
  "https://api.spotify.com/v1/me/playlists",
      {
        name,
        description,
        public: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(playlist.data);
  } catch (error) {
  console.error("==========");
  console.error("SPOTIFY ERROR:");
  console.error(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );
  console.error("==========");

  res.status(500).json({
    error: "Failed to create playlist",
  });
}
});

app.listen(3001, () => {
  console.log("Server draait op poort 3001");
});