import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import Offers from "../components/Offers";
import FAQAccordion from "../components/FAQAccordion";
import SectionDivider from "../components/SectionDivider";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";
import designIcon from "../assets/icons/design_icon.svg";
import badgeIcon from "../assets/icons/badge_icon.svg";
import glovesIcon from "../assets/icons/gloves-svgrepo-com.svg";
import whatsappChatIcon from "../assets/icons/whatsapp_chat_icon.svg";
import logo from "../assets/logo/midgard_logo_main.svg";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(rgba(13,12,10,0.95), rgba(13,12,10,0.95)), url('/hero-bg.jpg') center/cover",
          position: "relative",
        }}
      >
        <motion.div
          className="container"
          style={{
            textAlign: "center",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "-80px",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Midgard Tattoo Studio"
              style={{
                width: "clamp(300px, 60vw, 600px)",
                height: "auto",
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
              }}
            />
          </motion.div>
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
              flexDirection: "column",
              gap: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
            variants={fadeInUp}
          >
            <Link
              to="/galerie"
              className="btn"
              style={{
                padding: "15px 35px",
                fontSize: 18,
                background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                backgroundSize: "200% 200%",
                border: "none",
                width: "280px",
                maxWidth: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "#1a1a1a",
                animation: "goldShimmer 3s linear infinite",
              }}
            >
              Galerie ansehen
            </Link>
            <motion.a
              className="btn"
              href="https://wa.me/4917624752736?text=Ich%20möchte%20einen%20Termin%20anfragen"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 28px",
                fontSize: 14,
                background: "#25D366",
                color: "#ffffff",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                width: "240px",
                justifyContent: "center",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(37, 211, 102, 0.4)",
                background: "#20BA5A",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Termin via WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Features Section */}
      <section
        style={{
          padding: "0 20px",
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
                icon: designIcon,
                title: "Individuelle Designs",
                text: "Jedes Tattoo ist ein Unikat, maßgeschneidert nach deinen Wünschen",
              },
              {
                icon: badgeIcon,
                title: "Erfahrene Artists",
                text: "Über 15 Jahre kombinierte Erfahrung in verschiedenen Stilrichtungen",
              },
              {
                icon: glovesIcon,
                title: "Top Hygiene",
                text: "Zertifiziert und regelmäßig kontrolliert nach höchsten Standards",
              },
              {
                icon: whatsappChatIcon,
                title: "Beratung inklusive",
                text: "Kostenlose Erstberatung für dein perfektes Tattoo-Projekt",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                style={{
                  background: "rgb(30, 0, 7)",
                  padding: 30,
                  borderRadius: 12,
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
                  border: "1px solid rgba(212, 175, 55, 0.2)",
                }}
                variants={staggerItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(212, 175, 55, 0.3)";
                  e.currentTarget.style.background = "rgb(43, 0, 10)";
                  e.currentTarget.style.borderColor = "#d4af37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgb(30, 0, 7)";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 15 }}>
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    style={{
                      width: 48,
                      height: 48,
                      filter: feature.title === "Top Hygiene"
                        ? "invert(68%) sepia(37%) saturate(421%) hue-rotate(3deg) brightness(92%) contrast(87%) opacity(0.6)"
                        : "invert(68%) sepia(37%) saturate(421%) hue-rotate(3deg) brightness(92%) contrast(87%)"
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    marginBottom: 10,
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "goldShimmer 3s linear infinite",
                  }}
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

      <SectionDivider />

      {/* Gallery Preview */}
      <section className="container" style={{ padding: "0 20px" }}>
        <motion.div
          style={{ textAlign: "center", marginBottom: 50 }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 style={{
            fontSize: 42,
            marginBottom: 15,
            background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "goldShimmer 3s linear infinite",
          }}>Unsere Arbeiten</h2>
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

      <SectionDivider />

      {/* Offers Section */}
      <Offers />

      <SectionDivider />

      {/* Style Section */}
      <section style={{ padding: "0 20px" }}>
        <div className="container">
          <motion.div
            style={{ textAlign: "center", marginBottom: 50 }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <h2 style={{
              fontSize: 42,
              marginBottom: 15,
              background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "goldShimmer 3s linear infinite",
            }}>
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
                  background: "rgb(30, 0, 7)",
                  padding: 20,
                  borderRadius: 10,
                  textAlign: "center",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                variants={staggerItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgb(43, 0, 10)";
                  e.currentTarget.style.borderColor = "#d4af37";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgb(30, 0, 7)";
                  e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3 style={{
                  fontSize: 16,
                  background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "goldShimmer 3s linear infinite",
                }}>{style}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* FAQ Section */}
      <section className="container" style={{ padding: "0 20px" }}>
        <FAQAccordion />
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 3s linear infinite",
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
          <h2 style={{ fontSize: 42, marginBottom: 20, color: "#1a1a1a", fontWeight: 700 }}>
            Bereit für dein Traumtattoo?
          </h2>
          <p
            style={{
              fontSize: 18,
              marginBottom: 35,
              maxWidth: 700,
              margin: "0 auto 35px",
              lineHeight: 1.7,
              color: "#1a1a1a",
              fontWeight: 500,
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
            <motion.a
              className="btn"
              href="https://wa.me/4917624752736?text=Ich%20möchte%20einen%20Beratungstermin"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#ffffff",
                padding: "15px 35px",
                fontSize: 16,
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
              WhatsApp Beratung
            </motion.a>
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
