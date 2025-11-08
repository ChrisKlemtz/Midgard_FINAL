import React from "react";

export default function GalleryCard({ image, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(image)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        background: "#1b1816",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(200,160,93,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={image.url}
        alt={image.title || "Tattoo"}
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          display: "block",
        }}
        loading="lazy"
      />

      {/* Overlay Info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
          padding: 20,
          transform: "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
        className="gallery-card-overlay"
      >
        {image.title && (
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 5,
              color: "#fff",
            }}
          >
            {image.title}
          </h3>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "#c8a05d", fontWeight: 600 }}>
            {image.artist}
          </span>
          {image.tags && image.tags.length > 0 && (
            <div style={{ display: "flex", gap: 5 }}>
              {image.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    background: "#2a2623",
                    borderRadius: 4,
                    color: "#ddd",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        div:hover .gallery-card-overlay {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
