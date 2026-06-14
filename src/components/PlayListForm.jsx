import shining from "../assets/icons/shining.png";
import cd from "../assets/icons/cd.png";

function PlayListForm({
  prompt,
  setPrompt,
  generatePlaylist,
  loading,
}) {
 return (
  <>
    <div
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={shining}
          alt=""
          style={{
            width: "28px",
            height: "28px",
          }}
        />

        <h2>Describe your vibe</h2>
      </div>

      <p
        style={{
          color: "#9b8bbf",
          marginTop: "-10px",
        }}
      >
        A book, trope, mood, aesthetic, memory or feeling...
      </p>
    </div>

    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Fourth Wing, enemies to lovers, rainy coffee shop, clean girl morning..."
      style={{
        width: "700px",
        maxWidth: "90%",
        height: "180px",
        padding: "20px",
        borderRadius: "24px",
        border: "2px solid #d8caf7",
        fontSize: "1.1rem",
      }}
    />

    <button
      onClick={generatePlaylist}
      style={{
        marginTop: "25px",
        padding: "18px 36px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        background:
          "linear-gradient(90deg,#f6c8d8,#d8c1ff)",
        color: "#5f4f87",
        fontWeight: "bold",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        src={cd}
        alt=""
        style={{
          width: "22px",
          height: "22px",
        }}
      />

      Generate Playlist
    </button>

    {loading && (
      <p
        style={{
          marginTop: "20px",
          color: "#8b7ab0",
        }}
      >
        Creating magic...
      </p>
    )}
  </>
); 
}

export default PlayListForm;