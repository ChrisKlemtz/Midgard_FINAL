import React from "react";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import { fadeInUp, viewportConfig } from "../utils/animations";

export default function GaleriePage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1b1816 0%, #0d0c0a 100%)",
          padding: "120px 20px 60px",
          textAlign: "center",
        }}
      >
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>Tattoo Galerie</h1>
          <p
            style={{
              fontSize: 18,
              color: "#ccc",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            Entdecke unsere neuesten Arbeiten und lass dich inspirieren. Jedes
            Tattoo ist ein einzigartiges Kunstwerk, geschaffen mit Leidenschaft
            und Präzision.
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="container" style={{ padding: "60px 20px 100px" }}>
        <Gallery />
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #c8a05d 0%, #8b6f3e 100%)",
          padding: "60px 20px",
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
          <h2 style={{ fontSize: 32, marginBottom: 15 }}>
            Gefällt dir, was du siehst?
          </h2>
          <p
            style={{
              fontSize: 16,
              marginBottom: 30,
              maxWidth: 600,
              margin: "0 auto 30px",
            }}
          >
            Lass uns gemeinsam dein individuelles Tattoo gestalten!
          </p>
          <button
            className="btn"
            style={{
              background: "#1b1816",
              padding: "15px 35px",
              fontSize: 16,
              fontWeight: 700,
            }}
            onClick={() =>
              window.open(
                "https://wa.me/491234567890?text=Ich%20möchte%20ein%20Tattoo%20anfragen",
                "_blank"
              )
            }
          >
            Jetzt Termin anfragen
          </button>
        </motion.div>
      </section>
    </main>
  );
}
