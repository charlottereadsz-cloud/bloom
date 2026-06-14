import { loginWithSpotify }
from "../services/spotifyApi";

function SpotifyButton() {
  return (
    <button
      onClick={loginWithSpotify}
      style={{
        padding: "14px 24px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        background: "#1DB954",
        color: "white",
        fontWeight: "bold",
      }}
    >
      Connect Spotify
    </button>
  );
}

export default SpotifyButton;