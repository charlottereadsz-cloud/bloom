export function savePlaylist(playlist) {
  const saved = JSON.parse(
    localStorage.getItem("savedPlaylists") || "[]"
  );

  const playlistWithId = {
    ...playlist,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  saved.unshift(playlistWithId);

  localStorage.setItem(
    "savedPlaylists",
    JSON.stringify(saved)
  );
}

export function getSavedPlaylists() {
  return JSON.parse(
    localStorage.getItem("savedPlaylists") || "[]"
  );
}

export function deletePlaylist(id) {
  const playlists = getSavedPlaylists();

  const filtered = playlists.filter(
    (playlist) => playlist.id !== id
  );

  localStorage.setItem(
    "savedPlaylists",
    JSON.stringify(filtered)
  );
}