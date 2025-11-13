import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";
import glovesIcon from "../assets/icons/gloves-svgrepo-com.svg";
import badgeIcon from "../assets/icons/badge_icon.svg";
import bandageIcon from "../assets/icons/bandage-svgrepo-com.svg";
import cautionIcon from "../assets/icons/caution_icon.svg";
import "../styles/hygiene-cards.css";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  // Schließe expandierte Karte beim Scrollen
  useEffect(() => {
    const handleScroll = () => {
      if (expandedCard !== null) {
        setExpandedCard(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedCard]);

  // Schließe expandierte Karte bei Klick außerhalb
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (expandedCard !== null && !e.target.closest(".hygiene-card")) {
        setExpandedCard(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expandedCard]);

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
    "Convention Preise",
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
        style={{ textAlign: "center", marginBottom: 30, marginTop: "50px" }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>
          Zertifikate
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
          findest du unsere Hygiene-Zertifikate, Ausbildungsnachweise,
          Qualifikationen sowie unsere Convention-Preise.
        </p>
      </motion.div>

      {/* Hygiene-Info Banner */}
      <motion.div
        style={{
          background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 3s linear infinite",
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 15 }}>
          <img
            src={cautionIcon}
            alt="Hygiene"
            style={{ width: 48, height: 48, filter: "brightness(0) invert(1)" }}
          />
          <h2 style={{ fontSize: 28, margin: 0 }}>
            Höchste Hygienestandards
          </h2>
          <img
            src={cautionIcon}
            alt="Hygiene"
            style={{ width: 48, height: 48, filter: "brightness(0) invert(1)" }}
          />
        </div>
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
        className="category-filter"
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
              background: selectedCategory === cat
                ? "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)"
                : "#1b1816",
              backgroundSize: "200% 200%",
              animation: selectedCategory === cat ? "goldShimmer 3s linear infinite" : "none",
              border: `2px solid ${
                selectedCategory === cat ? "#d4af37" : "#555"
              }`,
              borderRadius: 25,
              color: selectedCategory === cat ? "#1a1a1a" : "#fff",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== cat) {
                e.currentTarget.style.borderColor = "#d4af37";
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
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                    backgroundSize: "200% 200%",
                    animation: "goldShimmer 3s linear infinite",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 15,
                    color: "#1a1a1a",
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
          className="hygiene-standards-container"
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
          {[
            {
              id: 0,
              icon: glovesIcon,
              title: "Einwegmaterialien",
              text: "Nadeln, Handschuhe und Tücher werden nur einmal verwendet",
              alt: "Einwegmaterialien",
            },
            {
              id: 1,
              icon: badgeIcon,
              title: "Zertifiziert",
              text: "Regelmäßige Schulungen und behördliche Kontrollen",
              alt: "Zertifiziert",
            },
            {
              id: 2,
              icon: bandageIcon,
              title: "Medizinischer Standard",
              text: "Wir arbeiten nach medizinischen Hygienerichtlinien",
              alt: "Medizinischer Standard",
            },
          ].map((card) => (
            <motion.div
              key={card.id}
              className={`hygiene-card ${expandedCard === card.id ? "expanded" : ""}`}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              variants={staggerItem}
              onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
            >
              <div
                className="card-icon"
                style={{ marginBottom: 15, display: "flex", justifyContent: "center" }}
              >
                <img
                  src={card.icon}
                  alt={card.alt}
                  style={{
                    width: 48,
                    height: 48,
                    filter:
                      "invert(68%) sepia(37%) saturate(421%) hue-rotate(3deg) brightness(92%) contrast(87%)",
                  }}
                />
              </div>
              <h3 className="card-title" style={{ fontSize: 20, marginBottom: 10 }}>
                {card.title}
              </h3>
              <p className="card-text" style={{ color: "#ccc", lineHeight: 1.6 }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
