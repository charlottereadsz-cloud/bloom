const CLIENT_ID = "0b21ad5fc8314bbebe0e51c191f1c0f2";

const REDIRECT_URI =
  "http://127.0.0.1:5173/callback";

const SCOPES = [
  "playlist-modify-public",
  "playlist-modify-private",
];

export function loginWithSpotify() {
  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "token",
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(" "),
    });

  window.location.href = authUrl;
}