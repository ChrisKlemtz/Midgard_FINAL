import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import Offers from "../components/Offers";
import FAQAccordion from "../components/FAQAccordion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(27,24,22,0.95) 0%, rgba(13,12,10,0.95) 100%), url('/hero-bg.jpg') center/cover",
          position: "relative",
        }}
      >
        <motion.div
          className="container"
          style={{ textAlign: "center", zIndex: 2 }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.h1
            className="title"
            style={{
              fontSize: "clamp(40px, 8vw, 72px)",
              marginBottom: 20,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
            variants={fadeInUp}
          >
            Midgard Tattoo Studio
          </motion.h1>
          <motion.p
            className="subtitle"
            style={{
              fontSize: "clamp(18px, 3vw, 24px)",
              marginBottom: 40,
              color: "#c8a05d",
              fontWeight: 600,
            }}
            variants={fadeInUp}
          >
            Nordisch. Edel. Hygienisch. — Dein Tattoo-Erlebnis.
          </motion.p>
          <motion.div
            style={{
              display: "flex",
              gap: 15,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            variants={fadeInUp}
          >
            <a
              className="btn"
              href="https://wa.me/491234567890?text=Ich%20möchte%20einen%20Termin%20anfragen"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "15px 35px", fontSize: 16 }}
            >
              📱 Termin via WhatsApp
            </a>
            <Link
              to="/galerie"
              className="btn"
              style={{
                padding: "15px 35px",
                fontSize: 16,
                background: "transparent",
                border: "2px solid #c8a05d",
              }}
            >
              🎨 Galerie ansehen
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "80px 20px",
          background: "#0d0c0a",
        }}
      >
        <div className="container">
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 40,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {[
              {
                icon: "✨",
                title: "Individuelle Designs",
                text: "Jedes Tattoo ist ein Unikat, maßgeschneidert nach deinen Wünschen",
              },
              {
                icon: "🏆",
                title: "Erfahrene Artists",
                text: "Über 15 Jahre kombinierte Erfahrung in verschiedenen Stilrichtungen",
              },
              {
                icon: "🧼",
                title: "Top Hygiene",
                text: "Zertifiziert und regelmäßig kontrolliert nach höchsten Standards",
              },
              {
                icon: "💬",
                title: "Beratung inklusive",
                text: "Kostenlose Erstberatung für dein perfektes Tattoo-Projekt",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                style={{
                  background: "#1b1816",
                  padding: 30,
                  borderRadius: 12,
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                variants={staggerItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(200,160,93,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 15 }}>
                  {feature.icon}
                </div>
                <h3
                  style={{ fontSize: 20, marginBottom: 10, color: "#c8a05d" }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#ccc", lineHeight: 1.6, fontSize: 15 }}>
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: 50 }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 style={{ fontSize: 42, marginBottom: 15 }}>Unsere Arbeiten</h2>
          <p
            style={{
              fontSize: 18,
              color: "#ccc",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Entdecke eine Auswahl unserer neuesten Tattoo-Kunstwerke
          </p>
        </motion.div>
        <Gallery />
        <motion.div
          style={{ marginTop: 40, textAlign: "center" }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <Link to="/galerie" className="btn" style={{ padding: "12px 30px" }}>
            Komplette Galerie ansehen →
          </Link>
        </motion.div>
      </section>

      {/* Offers Section */}
      <Offers />

      {/* Style Section */}
      <section style={{ padding: "80px 20px", background: "#0d0c0a" }}>
        <div className="container">
          <motion.div
            style={{ textAlign: "center", marginBottom: 50 }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <h2 style={{ fontSize: 42, marginBottom: 15 }}>
              Unsere Stilrichtungen
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "#ccc",
                maxWidth: 700,
                margin: "0 auto",
              }}
            >
              Von traditionell bis modern – wir beherrschen verschiedene
              Tattoo-Stile
            </p>
          </motion.div>

          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              maxWidth: 1000,
              margin: "0 auto",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {[
              "Traditional",
              "New School",
              "Realismus",
              "Fine Line",
              "Blackwork",
              "Nordische Motive",
              "Portraits",
              "Cover-ups",
            ].map((style, i) => (
              <motion.div
                key={i}
                style={{
                  background: "#1b1816",
                  padding: 20,
                  borderRadius: 10,
                  textAlign: "center",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                variants={staggerItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c8a05d";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <h3 style={{ fontSize: 16, color: "#fff" }}>{style}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <FAQAccordion />
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #c8a05d 0%, #8b6f3e 100%)",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <motion.div
          className="container"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 style={{ fontSize: 42, marginBottom: 20 }}>
            Bereit für dein Traumtattoo?
          </h2>
          <p
            style={{
              fontSize: 18,
              marginBottom: 35,
              maxWidth: 700,
              margin: "0 auto 35px",
              lineHeight: 1.7,
            }}
          >
            Kontaktiere uns jetzt für ein kostenloses Beratungsgespräch. Wir
            freuen uns darauf, deine Ideen in Kunst zu verwandeln!
          </p>
          <div
            style={{
              display: "flex",
              gap: 15,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              className="btn"
              href="https://wa.me/491234567890?text=Ich%20möchte%20einen%20Beratungstermin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#1b1816",
                padding: "15px 35px",
                fontSize: 16,
              }}
            >
              WhatsApp Beratung
            </a>
            <Link
              to="/about"
              className="btn"
              style={{
                background: "transparent",
                border: "2px solid #1b1816",
                padding: "15px 35px",
                fontSize: 16,
                color: "#1b1816",
              }}
            >
              Mehr über uns
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
