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

app.post("/api/spotify/create-playlist", async (req, res) => {
  try {
    const token =
      req.headers.authorization?.replace(
        "Bearer ",
        ""
      );

    const {
      name,
      description,
      songs,
    } = req.body;

    console.log("SONGS RECEIVED:");
    console.log(songs);

    const me = await axios.get(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    const playlistId = playlist.data.id;

    const uris = [];

    for (const song of songs) {
      try {
        const search = await axios.get(
          "https://api.spotify.com/v1/search",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              q: `${song.song} ${song.artist}`,
              type: "track",
              limit: 1,
            },
          }
        );

        const track =
          search.data.tracks.items[0];

        if (track) {
          uris.push(track.uri);
        }
      } catch {
        console.log(
          "Could not find:",
          song.song
        );
      }
    }

    console.log(
      "TRACKS FOUND:",
      uris.length
    );

    console.log(
      "PLAYLIST ID:",
      playlistId
    );

    console.log(
      "FIRST URI:",
      uris[0]
    );

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    if (uris.length > 0) {
      const addTracksResponse =
        await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "TRACK ADD RESPONSE:"
      );

      console.log(
        addTracksResponse.data
      );
    }

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

    console.error("STATUS:");

    console.error(
      error.response?.status
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