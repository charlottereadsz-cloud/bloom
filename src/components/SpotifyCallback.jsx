import { useEffect } from "react";

function SpotifyCallback() {
  useEffect(() => {
    const hash =
      window.location.hash.substring(1);

    const params =
      new URLSearchParams(hash);

    const token =
      params.get("access_token");

    if (token) {
      localStorage.setItem(
        "spotify_token",
        token
      );

      window.location.href = "/";
    }
  }, []);

  return <h2>Connecting...</h2>;
}

export default SpotifyCallback;