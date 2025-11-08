import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import GalleryCard from "./GalleryCard";
import { staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("Alle");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/gallery");
        setImages(res.data);
      } catch (e) {
        console.error("Galerie laden:", e);
      }
    }
    fetchImages();
  }, []);

  const filtered = images.filter((img) =>
    filter === "Alle" ? true : img.artist === filter
  );
  const artists = [
    "Alle",
    ...new Set(images.map((img) => img.artist).filter(Boolean)),
  ];

  return (
    <section style={{ position: "relative" }}>
      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 30,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {artists.map((artist) => (
          <button
            key={artist}
            onClick={() => setFilter(artist)}
            className="btn"
            style={{
              background: filter === artist ? "#c8a05d" : "transparent",
              border: `2px solid ${filter === artist ? "#c8a05d" : "#555"}`,
              padding: "10px 24px",
            }}
          >
            {artist}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        {filtered.map((img) => (
          <motion.div key={img._id} variants={staggerItem}>
            <GalleryCard image={img} onClick={setSelectedImage} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            background: "#1b1816",
            borderRadius: 12,
          }}
        >
          <p style={{ color: "#999", fontSize: 18 }}>
            Keine Bilder in dieser Kategorie gefunden.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: 40,
              cursor: "pointer",
              zIndex: 1001,
            }}
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
            {(selectedImage.title || selectedImage.artist) && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.8)",
                  padding: 20,
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {selectedImage.title && (
                  <h3 style={{ fontSize: 20, marginBottom: 5 }}>
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.artist && (
                  <p style={{ color: "#c8a05d", fontSize: 14 }}>
                    by {selectedImage.artist}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
