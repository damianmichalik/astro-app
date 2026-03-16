import { useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Props {
  images: Image[];
}

export default function ImageGallery({ images }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const prev = () =>
    setSelected((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setSelected((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.75rem",
        margin: "2rem 0",
      }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              background: "none",
              border: "2px solid transparent",
              borderRadius: "0.5rem",
              padding: 0,
              cursor: "pointer",
              overflow: "hidden",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366f1")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={navBtn}
          >‹</button>

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ textAlign: "center" }}>
            <img
              src={images[selected].src}
              alt={images[selected].alt}
              style={{ maxWidth: "80vw", maxHeight: "70vh", borderRadius: "0.5rem" }}
            />
            <p style={{ color: "#94a3b8", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              {images[selected].alt} — {selected + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={navBtn}
          >›</button>

          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            style={{ position: "absolute", top: "1rem", right: "1.5rem", ...navBtn, fontSize: "1.5rem" }}
          >✕</button>
        </div>
      )}
    </>
  );
}

const navBtn: React.CSSProperties = {
  background: "rgba(255,255,255,0.1)",
  border: "none",
  color: "white",
  fontSize: "2.5rem",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  borderRadius: "0.5rem",
  lineHeight: 1,
};
