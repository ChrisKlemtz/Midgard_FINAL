import React from "react";
import { motion } from "framer-motion";
import FAQAccordion from "../components/FAQAccordion";
import { fadeInUp, viewportConfig } from "../utils/animations";
import faqHeroBg from "../assets/images/faq_heor_bg.png";

export default function FAQPage() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          position: "relative",
          background: `url(${faqHeroBg}) center top/100% auto no-repeat`,
          backgroundColor: "#0d0c0a",
          padding: "140px 20px 50px",
          textAlign: "center",
        }}
      >
        {/* Gradient Overlay - blends into next section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, transparent 0%, #0d0c0a 100%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ marginTop: "30px", position: "relative", zIndex: 1 }}
        >
          <h1 style={{ fontSize: 48, marginBottom: 20 }}>
            Häufig gestellte Fragen
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#ccc",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            Hier findest du Antworten auf die wichtigsten Fragen rund um
            Tattoos, Piercings, Hygiene und Termine.
          </p>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section
        className="container"
        style={{ padding: "60px 20px 100px", background: "#0d0c0a" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <FAQAccordion />
        </motion.div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 3s linear infinite",
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
          <h2 style={{ fontSize: 40, marginBottom: 15, color: "#1a1a1a" }}>
            Noch Fragen?
          </h2>
          <p
            style={{
              fontSize: 20,
              marginBottom: 30,
              maxWidth: 600,
              margin: "0 auto 30px",
              color: "#1a1a1a",
            }}
          >
            Kontaktiere uns direkt über WhatsApp!
          </p>
          <motion.button
            className="btn"
            style={{
              background: "#25D366",
              color: "#ffffff",
              padding: "15px 35px",
              fontSize: 16,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              margin: "0 auto",
              border: "none",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(37, 211, 102, 0.4)",
              background: "#20BA5A",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() =>
              window.open(
                "https://wa.me/4917624752736?text=Ich%20habe%20eine%20Frage",
                "_blank"
              )
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Jetzt Frage stellen
          </motion.button>
        </motion.div>
      </section>
    </main>
  );
}
