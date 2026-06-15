import { savePlaylist } from "../services/storageApi";
import music from "../assets/icons/music.png";
import heart from "../assets/icons/heart.png";
import { useState } from "react";
function getCoverGradient(title) {
  const titleLower = title.toLowerCase();

  if (
    titleLower.includes("dragon") ||
    titleLower.includes("fantasy") ||
    titleLower.includes("dagger")
  ) {
    return "linear-gradient(135deg,#8B5CF6,#6366F1)";
  }

  if (
    titleLower.includes("love") ||
    titleLower.includes("romance") ||
    titleLower.includes("heart")
  ) {
    return "linear-gradient(135deg,#F9A8D4,#C4B5FD)";
  }

  if (
    titleLower.includes("summer") ||
    titleLower.includes("sun")
  ) {
    return "linear-gradient(135deg,#FDBA74,#F9A8D4)";
  }

  if (
    titleLower.includes("night") ||
    titleLower.includes("moon")
  ) {
    return "linear-gradient(135deg,#312E81,#7C3AED)";
  }

  return "linear-gradient(135deg,#F9CBD6,#DCCBFF)";
}
function PlaylistResult({ playlist }) {
 console.log("BLOOM PLAYLIST:", playlist);
console.log("SONGS:", playlist?.songs); 
  if (!playlist) return null;
const [showSongs, setShowSongs] =
  useState(false);
  return (
    <div
      style={{
        marginTop: "40px",
        width: "700px",
        maxWidth: "90%",

        background: "rgba(255,255,255,0.55)",

        backdropFilter: "blur(20px)",

        borderRadius: "32px",

        padding: "32px",

        border: "1px solid rgba(255,255,255,0.6)",

        boxShadow:
          "0 20px 60px rgba(190,170,255,0.2)",
      }}
    >
      <div
        style={{
          width: "240px",
          height: "240px",

          margin: "0 auto 30px",

          borderRadius: "28px",

          background:
            getCoverGradient(playlist.title),

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          textAlign: "center",

          padding: "20px",

          color: "white",

          fontWeight: "700",

          fontSize: "1.7rem",

          lineHeight: "1.3",

          boxShadow:
            "0 15px 40px rgba(220,203,255,0.4)",
        }}
      >
        {playlist.title}
      </div>

      <h2
        style={{
          fontSize: "2rem",

          textAlign: "center",

          color: "#6D5B8C",

          marginBottom: "12px",
        }}
      >
        {playlist.title}
      </h2>

      <p
        style={{
          color: "#8F7AAE",

          fontStyle: "italic",

          textAlign: "center",

          lineHeight: "1.8",

          marginBottom: "30px",
        }}
      >
        {playlist.description}
      </p>
<div
  style={{
    background: "rgba(255,255,255,0.5)",
    borderRadius: "24px",
    padding: "20px",
    marginBottom: "30px",
    border: "1px solid rgba(255,255,255,0.7)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-around",
      textAlign: "center",
    }}
  >
    <div>
      <div
        style={{
          fontSize: "1.6rem",
        }}
      >
        🎵
      </div>

      <p
        style={{
          margin: "8px 0 0",
          color: "#6D5B8C",
          fontWeight: "bold",
        }}
      >
        {playlist?.songs?.length || 0}
      </p>

      <span
        style={{
          color: "#9B87B3",
          fontSize: ".9rem",
        }}
      >
        Songs
      </span>
    </div>

    <div>
      <div
        style={{
          fontSize: "1.6rem",
        }}
      >
        🌸
      </div>

      <p
        style={{
          margin: "8px 0 0",
          color: "#6D5B8C",
          fontWeight: "bold",
        }}
      >
        Bloom
      </p>

      <span
        style={{
          color: "#9B87B3",
          fontSize: ".9rem",
        }}
      >
        Curated
      </span>
    </div>

    <div>
      <div
        style={{
          fontSize: "1.6rem",
        }}
      >
        ✨
      </div>

      <p
        style={{
          margin: "8px 0 0",
          color: "#6D5B8C",
          fontWeight: "bold",
        }}
      >
        AI
      </p>

      <span
        style={{
          color: "#9B87B3",
          fontSize: ".9rem",
        }}
      >
        Generated
      </span>
    </div>
  </div>
</div>
      <div
        style={{
          display: "flex",

          justifyContent: "center",

          marginBottom: "20px",
        }}
      >
     <button
  onClick={() => savePlaylist(playlist)}
  style={{
    background:
      "linear-gradient(90deg,#f6c8d8,#d8c1ff)",
    color: "#5f4f87",
    border: "none",
    padding: "12px 24px",
    borderRadius: "999px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <img
    src={heart}
    alt=""
    style={{
      width: "20px",
      height: "20px",
    }}
  />

  Save Playlist
</button>  

<button
 onClick={async () => {
  const token =
    localStorage.getItem("spotify_token");

  const response = await fetch(
    "https://bloom-api-yd4r.onrender.com/api/spotify/create-playlist",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
  name: playlist.title,
  description: playlist.description,
  songs: playlist.songs,
}),
    }
  );

console.log("SONGS SENT:", playlist.songs);

  const data = await response.json();

  console.log(data);
}}
  style={{
    background: "#1DB954",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "999px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "12px",
  }}
>
  🎵 Export to Spotify
</button>

      </div>

    <div
  style={{
    display: "flex",
    justifyContent: "center",
  }}
>
  <button
    onClick={() =>
      setShowSongs(!showSongs)
    }
    style={{
      marginBottom: "20px",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#7e69a8",
      fontWeight: "bold",
      fontSize: "1rem",
    }}
  >
    {showSongs
      ? "▲ Hide Songs"
      : "▼ Show Songs"}
  </button>
</div>  
{showSongs &&
  playlist.songs.map((song, index) => (
    <div
      key={index}
      style={{
        background: "#ffffff",
        padding: "16px",
        borderRadius: "18px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <img
        src={music}
        alt=""
        style={{
          width: "20px",
          height: "20px",
        }}
      />

      <div>
        <strong>{song.song}</strong>
        <br />

        <span
          style={{
            color: "#8e7db4",
          }}
        >
          {song.artist}
        </span>
      </div>
    </div>
  ))}
      
    </div>
  );
}

export default PlaylistResult;