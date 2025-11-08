import React from "react";
import { motion } from "framer-motion";
import AboutTeam from "../components/AboutTeam";
import FAQAccordion from "../components/FAQAccordion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1b1816 0%, #0d0c0a 100%)",
          padding: "120px 20px 80px",
          textAlign: "center",
        }}
      >
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 style={{ fontSize: 52, marginBottom: 20 }}>
            Über Midgard Tattoo
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#ccc",
              maxWidth: 800,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            Willkommen bei Midgard Tattoo – wo nordische Kunst auf moderne
            Tattoo-Kultur trifft. Unser Studio steht für höchste Qualität,
            Kreativität und Hygiene.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInLeft}
          >
            <h2 style={{ fontSize: 36, marginBottom: 20, color: "#c8a05d" }}>
              Unsere Geschichte
            </h2>
            <p
              style={{
                color: "#ccc",
                lineHeight: 1.8,
                fontSize: 16,
                marginBottom: 15,
              }}
            >
              Midgard Tattoo wurde 2015 aus der Leidenschaft für Kunst und
              nordische Mythologie geboren. Was als kleines Studio begann, ist
              heute eine etablierte Adresse für hochwertige Tattoos und
              individuelle Designs.
            </p>
            <p style={{ color: "#ccc", lineHeight: 1.8, fontSize: 16 }}>
              Der Name "Midgard" stammt aus der nordischen Mythologie und
              bezeichnet die Welt der Menschen – ein Ort der Verbindung zwischen
              verschiedenen Welten. Genau diese Verbindung schaffen wir:
              zwischen deiner Vision und ihrer perfekten Umsetzung auf der Haut.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInRight}
          >
            <h2 style={{ fontSize: 36, marginBottom: 20, color: "#c8a05d" }}>
              Unsere Philosophie
            </h2>
            <p
              style={{
                color: "#ccc",
                lineHeight: 1.8,
                fontSize: 16,
                marginBottom: 15,
              }}
            >
              Jedes Tattoo erzählt eine Geschichte. Unsere Mission ist es, deine
              persönliche Geschichte in ein Kunstwerk zu verwandeln, das ein
              Leben lang hält. Wir nehmen uns Zeit für jedes Projekt und
              arbeiten eng mit dir zusammen.
            </p>
            <p style={{ color: "#ccc", lineHeight: 1.8, fontSize: 16 }}>
              Hygiene und Sicherheit stehen bei uns an erster Stelle. Wir
              arbeiten nach höchsten medizinischen Standards und sind regelmäßig
              zertifiziert. Deine Gesundheit ist uns genauso wichtig wie deine
              Zufriedenheit.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 30,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {[
            {
              icon: "🎨",
              title: "Kreativität",
              text: "Individuelle Designs nach deinen Wünschen",
            },
            {
              icon: "🛡️",
              title: "Hygiene",
              text: "Höchste Sicherheits- und Hygienestandards",
            },
            {
              icon: "💎",
              title: "Qualität",
              text: "Erstklassige Materialien und Technik",
            },
            {
              icon: "❤️",
              title: "Passion",
              text: "Leidenschaft für die Kunst des Tätowierens",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              variants={staggerItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div style={{ fontSize: 48, marginBottom: 15 }}>{value.icon}</div>
              <h3 style={{ fontSize: 20, marginBottom: 10, color: "#c8a05d" }}>
                {value.title}
              </h3>
              <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6 }}>
                {value.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <AboutTeam />

      {/* FAQ Section */}
      <section className="container" style={{ padding: "80px 20px" }}>
        <FAQAccordion />
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
          <h2 style={{ fontSize: 36, marginBottom: 15 }}>
            Bereit für dein Tattoo?
          </h2>
          <p
            style={{
              fontSize: 18,
              marginBottom: 30,
              maxWidth: 600,
              margin: "0 auto 30px",
            }}
          >
            Lass uns gemeinsam dein Traumtattoo realisieren. Kontaktiere uns für
            ein kostenloses Beratungsgespräch!
          </p>
          <button
            className="btn"
            style={{
              background: "#1b1816",
              padding: "15px 40px",
              fontSize: 16,
              fontWeight: 700,
            }}
            onClick={() =>
              window.open(
                "https://wa.me/491234567890?text=Ich%20möchte%20einen%20Beratungstermin",
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
