export async function generatePlaylist(prompt) {
  const response = await fetch(
    "https://bloom-api-yd4r.onrender.com/api/generate-playlist",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    }
  );

  const data = await response.json();

  return data;
}