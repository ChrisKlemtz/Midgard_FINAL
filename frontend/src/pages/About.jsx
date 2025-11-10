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
          <motion.button
            className="btn"
            style={{
              background: "#25D366",
              color: "#ffffff",
              padding: "15px 40px",
              fontSize: 16,
              fontWeight: 700,
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(37, 211, 102, 0.4)",
              background: "#20BA5A",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open(
                "https://wa.me/4917624752736?text=Ich%20möchte%20einen%20Beratungstermin",
                "_blank"
              )
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Jetzt Termin anfragen
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
