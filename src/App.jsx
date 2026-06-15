import SpotifyButton from
"./components/SpotifyButton";
import { useState, useEffect } from "react";

import heart from "./assets/icons/heart.png";

import PlayListForm from "./components/PlayListForm";
import PlayListResult from "./components/PlayListResult";
import SavedPlaylists from "./components/SavedPlaylists";

import { generatePlaylist } from "./services/playlistApi";

function App() {
  const [playlist, setPlaylist] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
const [selectedPlaylist, setSelectedPlaylist] =
  useState(null);
useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  const token =
    params.get("spotify_token");

  console.log("URL:", window.location.href);
console.log("TOKEN:", token);
    if (token) {
    localStorage.setItem(
      "spotify_token",
      token
    );

    window.history.replaceState(
      {},
      "",
      "/"
    );

    console.log(
      "Spotify token opgeslagen!"
    );
  }
}, []);  
  const handleGeneratePlaylist = async () => {
    setLoading(true);

    try {
      const data = await generatePlaylist(prompt);
      setPlaylist(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: `
          linear-gradient(
            180deg,
            #fffafc 0%,
            #fdf6ff 25%,
            #f7efff 60%,
            #f3efff 100%
          )
        `,

        color: "#5f4f87",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        padding: "50px 20px",
      }}
    >
      {/* HERO */}

      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",

            width: "450px",
            height: "450px",

            left: "50%",
            top: "-120px",

            transform: "translateX(-50%)",

            borderRadius: "50%",

            background:
              "radial-gradient(circle, rgba(255,195,220,.6) 0%, rgba(216,193,255,.25) 50%, transparent 80%)",

            filter: "blur(70px)",

            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            position: "relative",
            zIndex: 1,

            margin: 0,

            fontSize: "4rem",

            lineHeight: "1",

            color: "#6f5d95",

            fontWeight: "800",
          }}
        >
          Bloom
        </h1>

        <p
          style={{
            position: "relative",
            zIndex: 1,

            marginTop: "10px",

            color: "#9b8bbf",

            fontSize: "1.2rem",
          }}
        >
          Turn any vibe into the perfect playlist
        </p>
      </div>

      {/* LIBRARY BUTTON */}

      <button
        onClick={() => setShowSaved(!showSaved)}
        style={{
          marginBottom: "40px",

          padding: "16px 30px",

          borderRadius: "999px",

          border: "none",

          cursor: "pointer",

          background:
            "linear-gradient(90deg,#f6c8d8,#d8c1ff)",

          display: "flex",

          alignItems: "center",

          gap: "10px",

          color: "#5f4f87",

          fontWeight: "bold",

          fontSize: "1rem",

          boxShadow:
            "0 10px 30px rgba(216,193,255,.25)",
        }}
      >
        <img
          src={heart}
          alt=""
          style={{
            width: "24px",
            height: "24px",
          }}
        />

        {showSaved ? "Back Home" : "My Library"}
      </button>

<SpotifyButton />

      {/* CONTENT */}

      {showSaved ? (
      <SavedPlaylists
  onOpenPlaylist={(playlist) => {
    setSelectedPlaylist(playlist);
    setShowSaved(false);
  }}
/> 
      ) : (
        <>
          <PlayListForm
            prompt={prompt}
            setPrompt={setPrompt}
            generatePlaylist={handleGeneratePlaylist}
            loading={loading}
          />

<PlayListResult
  playlist={selectedPlaylist || playlist}
/>         
        </>
      )}
    </div>
  );
}

export default App;