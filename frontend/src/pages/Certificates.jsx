import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/certificates"
      );
      setCertificates(res.data);
    } catch (error) {
      console.error("Fehler beim Laden der Zertifikate:", error);
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    "Alle",
    "Hygiene",
    "Ausbildung",
    "Qualifikation",
    "Sonstiges",
  ];
  const filteredCertificates =
    selectedCategory === "Alle"
      ? certificates.filter((c) => c.active)
      : certificates.filter((c) => c.category === selectedCategory && c.active);

  if (loading) {
    return (
      <section
        className="container"
        style={{ padding: "100px 20px", textAlign: "center" }}
      >
        <h2>Lade Zertifikate...</h2>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: "100px 20px" }}>
      <motion.div
        style={{ textAlign: "center", marginBottom: 60 }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Zertifikate & Hygiene
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "#ccc",
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Deine Sicherheit und Gesundheit haben für uns höchste Priorität. Hier
          findest du unsere Hygiene-Zertifikate, Ausbildungsnachweise und
          Qualifikationen.
        </p>
      </motion.div>

      {/* Hygiene-Info Banner */}
      <motion.div
        style={{
          background: "linear-gradient(135deg, #c8a05d 0%, #8b6f3e 100%)",
          padding: 40,
          borderRadius: 16,
          marginBottom: 50,
          textAlign: "center",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
      >
        <h2 style={{ fontSize: 28, marginBottom: 15 }}>
          🛡️ Höchste Hygienestandards
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Wir arbeiten nach den strengsten Hygiene- und Gesundheitsvorschriften.
          Alle Instrumente werden sterilisiert und Einwegmaterialien verwendet.
          Regelmäßige Schulungen und Kontrollen garantieren deine Sicherheit.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "12px 24px",
              background: selectedCategory === cat ? "#c8a05d" : "transparent",
              border: `2px solid ${
                selectedCategory === cat ? "#c8a05d" : "#555"
              }`,
              borderRadius: 25,
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== cat) {
                e.currentTarget.style.borderColor = "#c8a05d";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== cat) {
                e.currentTarget.style.borderColor = "#555";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 30,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {filteredCertificates.map((cert) => (
            <motion.div
              key={cert._id}
              style={{
                background: "#1b1816",
                borderRadius: 16,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              variants={staggerItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(200,160,93,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {cert.imageUrl ? (
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  style={{ width: "100%", height: 250, objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 250,
                    background:
                      "linear-gradient(135deg, #2a2623 0%, #1b1816 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 60,
                  }}
                >
                  🏆
                </div>
              )}
              <div style={{ padding: 25 }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: "#c8a05d",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 15,
                  }}
                >
                  {cert.category}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 12 }}>{cert.title}</h3>
                {cert.description && (
                  <p
                    style={{ color: "#ccc", lineHeight: 1.6, marginBottom: 15 }}
                  >
                    {cert.description}
                  </p>
                )}
                {cert.issuer && (
                  <div style={{ fontSize: 14, color: "#999", marginBottom: 5 }}>
                    <strong>Aussteller:</strong> {cert.issuer}
                  </div>
                )}
                {cert.issueDate && (
                  <div style={{ fontSize: 14, color: "#999" }}>
                    <strong>Ausstellungsdatum:</strong>{" "}
                    {new Date(cert.issueDate).toLocaleDateString("de-DE")}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            background: "#1b1816",
            borderRadius: 16,
          }}
        >
          <h3 style={{ fontSize: 24, marginBottom: 10 }}>
            Keine Zertifikate in dieser Kategorie
          </h3>
          <p style={{ color: "#999" }}>
            Wähle eine andere Kategorie oder schau bald wieder vorbei.
          </p>
        </div>
      )}

      {/* Additional Info Section */}
      <div style={{ marginTop: 80 }}>
        <motion.h2
          style={{ fontSize: 36, marginBottom: 30, textAlign: "center" }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          Unsere Hygienestandards
        </motion.h2>
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 30,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          <motion.div
            style={{
              background: "#1b1816",
              padding: 30,
              borderRadius: 12,
              textAlign: "center",
            }}
            variants={staggerItem}
          >
            <div style={{ fontSize: 48, marginBottom: 15 }}>🧼</div>
            <h3 style={{ fontSize: 20, marginBottom: 10 }}>Sterilisation</h3>
            <p style={{ color: "#ccc", lineHeight: 1.6 }}>
              Alle wiederverwendbaren Instrumente werden im Autoklaven
              sterilisiert
            </p>
          </motion.div>
          <motion.div
            style={{
              background: "#1b1816",
              padding: 30,
              borderRadius: 12,
              textAlign: "center",
            }}
            variants={staggerItem}
          >
            <div style={{ fontSize: 48, marginBottom: 15 }}>🧤</div>
            <h3 style={{ fontSize: 20, marginBottom: 10 }}>Einwegmaterial</h3>
            <p style={{ color: "#ccc", lineHeight: 1.6 }}>
              Nadeln, Handschuhe und Tücher werden nur einmal verwendet
            </p>
          </motion.div>
          <motion.div
            style={{
              background: "#1b1816",
              padding: 30,
              borderRadius: 12,
              textAlign: "center",
            }}
            variants={staggerItem}
          >
            <div style={{ fontSize: 48, marginBottom: 15 }}>✅</div>
            <h3 style={{ fontSize: 20, marginBottom: 10 }}>Zertifiziert</h3>
            <p style={{ color: "#ccc", lineHeight: 1.6 }}>
              Regelmäßige Schulungen und behördliche Kontrollen
            </p>
          </motion.div>
          <motion.div
            style={{
              background: "#1b1816",
              padding: 30,
              borderRadius: 12,
              textAlign: "center",
            }}
            variants={staggerItem}
          >
            <div style={{ fontSize: 48, marginBottom: 15 }}>🏥</div>
            <h3 style={{ fontSize: 20, marginBottom: 10 }}>
              Medizinischer Standard
            </h3>
            <p style={{ color: "#ccc", lineHeight: 1.6 }}>
              Wir arbeiten nach medizinischen Hygienerichtlinien
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
