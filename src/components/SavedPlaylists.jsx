import { getSavedPlaylists } from "../services/storageApi";
import { deletePlaylist } from "../services/storageApi";
import blossom from "../assets/icons/cherry-blossom.png";
import moon from "../assets/icons/night-mode.png";
import sun from "../assets/icons/day.png";
import cd from "../assets/icons/cd.png";
import music from "../assets/icons/music.png";
import sparkle from "../assets/icons/shining.png";
import eye from "../assets/icons/eye.png";
import heartIcon from "../assets/icons/heart.png";
import heart from "../assets/icons/heart.png";
import trash from "../assets/icons/trash.png";

function getCoverGradient(title) {
  const text = title.toLowerCase();

  if (
    text.includes("love") ||
    text.includes("romance")
  ) {
    return "linear-gradient(135deg,#F9CBD6,#FFD6EC)";
  }

  if (
    text.includes("night") ||
    text.includes("moon")
  ) {
    return "linear-gradient(135deg,#B8B4FF,#8E95FF)";
  }

  if (
    text.includes("summer") ||
    text.includes("sun")
  ) {
    return "linear-gradient(135deg,#FFD89B,#FFF1CC)";
  }

  if (
    text.includes("dragon") ||
    text.includes("dagger") ||
    text.includes("fantasy")
  ) {
    return "linear-gradient(135deg,#C6B3FF,#F0D3FF)";
  }

  return "linear-gradient(135deg,#F9CBD6,#DCCBFF)";
}
function SavedPlaylists({ onOpenPlaylist }) {
  const playlists = getSavedPlaylists();
function getCoverIcon(title) {
  const text = title.toLowerCase();

  if (
    text.includes("love") ||
    text.includes("romance") ||
    text.includes("kiss")
  )
    return heartIcon;

  if (
    text.includes("night") ||
    text.includes("midnight") ||
    text.includes("moon")
  )
    return moon;

  if (
    text.includes("summer") ||
    text.includes("sun")
  )
    return sun;

  if (
    text.includes("magic") ||
    text.includes("dream")
  )
    return sparkle;

  if (
    text.includes("dark") ||
    text.includes("shadow") ||
    text.includes("mystery")
  )
    return eye;

  if (
    text.includes("party") ||
    text.includes("dance")
  )
    return cd;


 
    return blossom;
}
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        marginTop: "20px",
      }}
    >
      <h2
        style={{
          color: "#6D5B8C",
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        <img
          src={heart}
          alt=""
          style={{
            width: "28px",
            marginRight: "10px",
            verticalAlign: "middle",
          }}
        />
        My Library
      </h2>

      {playlists.length === 0 && (
        <p
          style={{
            color: "#9B87B3",
            textAlign: "center",
          }}
        >
          No saved playlists yet ✨
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "28px",
        }}
      >
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() =>
              onOpenPlaylist(playlist)
            }
            style={{
              position: "relative",

              background:
                "rgba(255,255,255,0.65)",

              backdropFilter: "blur(20px)",

              borderRadius: "30px",

              padding: "22px",

              border:
                "1px solid rgba(255,255,255,0.8)",

              boxShadow:
                "0 20px 60px rgba(190,170,255,0.15)",

              cursor: "pointer",

              transition: "all .2s ease",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();

                deletePlaylist(playlist.id);

                window.location.reload();
              }}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",

                background: "none",
                border: "none",

                cursor: "pointer",
              }}
            >
              <img
                src={trash}
                alt="Delete"
                style={{
                  width: "20px",
                  height: "20px",
                  opacity: 0.6,
                }}
              />
            </button>

            <div
              style={{
                width: "100%",
                height: "230px",

                borderRadius: "24px",

background:
  getCoverGradient(playlist.title),                

display: "flex",

flexDirection: "column",

alignItems: "center",

justifyContent: "center",

gap: "10px",               

                textAlign: "center",

                color: "white",

                fontWeight: "700",

                fontSize: "1.2rem",

                lineheight: "1.2",

                padding: "20px",

                boxSizing: "border-box",

                marginBottom: "20px",
              }}
            >
 <>
  <img
    src={getCoverIcon(playlist.title)}
    alt=""
    style={{
      width: "80px",
      height: "80px",
      marginBottom: "16px",
    }}
  />

  <div>
    {playlist.title}
  </div>
</>             
            </div>

            <h3
              style={{
                color: "#6D5B8C",

                fontSize: "1.3rem",

                marginBottom: "10px",

                textAlign: "center",
              }}
            >
              {playlist.title}
            </h3>

<>
  <p
    style={{
      color: "#9B87B3",
      textAlign: "center",
      fontSize: "1.1rem",
      margin: 0,
    }}
  >
    {playlist?.songs?.length || 0} songs
  </p>

  <p
    style={{
      color: "#A899C4",
      fontSize: "0.9rem",
      marginTop: "12px",
      textAlign: "center",
      lineHeight: "1.5",
    }}
  >
    {playlist.description?.slice(0, 45)}...
  </p>
</>            
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPlaylists;