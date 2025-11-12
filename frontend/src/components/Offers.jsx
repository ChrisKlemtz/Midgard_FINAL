import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );

  useEffect(() => {
    loadOffers();

    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset slide when category changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedCategory]);

  async function loadOffers() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/offers");
      setOffers(res.data);
    } catch (error) {
      console.error("Fehler beim Laden der Angebote:", error);
    }
  }

  const categories = [
    "Alle",
    ...new Set(offers.map((o) => o.category).filter(Boolean)),
  ];
  const filteredOffers =
    selectedCategory === "Alle"
      ? offers.filter((o) => o.active)
      : offers.filter((o) => o.category === selectedCategory && o.active);

  // Fallback-Angebote falls keine aus der DB geladen wurden
  const defaultOffers = [
    {
      _id: "4",
      title: "Beratungsgespräch",
      description:
        "Kostenlose Erstberatung für dein Tattoo-Projekt. Wir besprechen Design, Platzierung und alle Details.",
      category: "Beratung",
      icon: "💬",
    },
    {
      _id: "1",
      title: "Custom Tattoo",
      description:
        "Dein individuelles Design, maßgeschneidert nach deinen Wünschen. Von der ersten Skizze bis zum fertigen Kunstwerk.",
      category: "Tattoo",
      icon: "🎨",
    },
    {
      _id: "2",
      title: "Cover-up",
      description:
        "Verwandle alte oder ungeliebte Tattoos in neue Meisterwerke. Unsere Spezialität!",
      category: "Cover-up",
      icon: "🔄",
    },
    {
      _id: "3",
      title: "Fine Line Tattoo",
      description:
        "Filigrane, minimalistische Designs mit höchster Präzision gestochen.",
      category: "Tattoo",
      icon: "✨",
    },
    {
      _id: "5",
      title: "Flash Tattoos",
      description:
        "Vorgezeichnete Designs zu speziellen Preisen. Perfekt für spontane Entscheidungen!",
      category: "Tattoo",
      icon: "⚡",
    },
    {
      _id: "6",
      title: "Piercing Service",
      description:
        "Professionelles Piercing auf Anfrage mit höchsten Hygienestandards.",
      category: "Piercing",
      icon: "💎",
    },
  ];

  const displayOffers =
    filteredOffers.length > 0 ? filteredOffers : defaultOffers;

  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % displayOffers.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + displayOffers.length) % displayOffers.length);
  };

  const renderOfferCard = (offer) => (
    <motion.div
      key={offer._id}
      style={{
        background: "rgb(30, 0, 7)",
        borderRadius: 16,
        padding: 30,
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        cursor: isMobile ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(212, 175, 55, 0.2)",
      }}
      variants={staggerItem}
      onMouseEnter={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 15px 35px rgba(212, 175, 55, 0.3)";
          e.currentTarget.style.background = "rgb(43, 0, 10)";
          e.currentTarget.style.borderColor = "#d4af37";
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = "rgb(30, 0, 7)";
          e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.2)";
        }
      }}
    >
      {offer.imageUrl ? (
        <img
          src={offer.imageUrl}
          alt={offer.title}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 20,
          }}
        />
      ) : (
        <div
          style={{
            fontSize: 60,
            textAlign: "center",
            marginBottom: 20,
            opacity: 0.8,
          }}
        >
          {offer.icon || "⚡"}
        </div>
      )}

      <div
        style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 3s linear infinite",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 15,
          color: "#1a1a1a",
        }}
      >
        {offer.category}
      </div>

      <h3 style={{
        fontSize: 24,
        marginBottom: 12,
        background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "goldShimmer 3s linear infinite",
      }}>{offer.title}</h3>

      <p
        style={{
          color: "#ccc",
          lineHeight: 1.7,
          marginBottom: 20,
          fontSize: 15,
          minHeight: 85,
        }}
      >
        {offer.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
          borderTop: "1px solid #333",
        }}
      >
        <button
          className="btn"
          style={{ padding: "12px 40px", fontSize: 14, width: "100%" }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(
              "https://wa.me/4917624752736?text=Ich%20interessiere%20mich%20für:%20" +
                offer.title,
              "_blank"
            );
          }}
        >
          Anfragen
        </button>
      </div>
    </motion.div>
  );

  return (
    <section style={{ padding: "0 20px" }}>
      <div className="container">
        <motion.div
          style={{ textAlign: "center", marginBottom: 60 }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 style={{
            fontSize: 42,
            marginBottom: 20,
            background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "goldShimmer 3s linear infinite",
          }}>Unsere Leistungen</h2>
          <p
            style={{
              fontSize: 18,
              color: "#ccc",
              maxWidth: 700,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Von individuellen Custom-Designs bis zu professionellen Cover-ups –
            wir bieten dir ein komplettes Portfolio an Tattoo- und
            Piercing-Services.
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginBottom: 50,
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "10px 24px",
                  background:
                    selectedCategory === cat ? "#c8a05d" : "transparent",
                  border: `2px solid ${
                    selectedCategory === cat ? "#c8a05d" : "#555"
                  }`,
                  borderRadius: 25,
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 14,
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
        )}

        {/* Desktop: Offers Grid */}
        {!isMobile && (
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 30,
              maxWidth: 1200,
              margin: "0 auto",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {displayOffers.map((offer) => renderOfferCard(offer))}
          </motion.div>
        )}

        {/* Mobile/Tablet: Carousel */}
        {isMobile && displayOffers.length > 0 && (
          <div className="offers-carousel-stack">
            <div className="carousel-stack-container">
              <AnimatePresence initial={false} custom={direction}>
                {/* Previous card (background left) */}
                <motion.div
                  key={`prev-${currentSlide}`}
                  custom={direction}
                  className="carousel-card carousel-card-prev"
                  initial={(custom) => ({
                    opacity: custom > 0 ? 0.3 : 0,
                    scale: custom > 0 ? 0.75 : 1,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? -180 : 180,
                    zIndex: 1
                  })}
                  animate={{
                    opacity: 0.3,
                    scale: 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: -180,
                    zIndex: 1
                  }}
                  exit={(custom) => ({
                    opacity: 0,
                    scale: custom > 0 ? 1 : 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? -360 : 0,
                    zIndex: 1
                  })}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  {renderOfferCard(
                    displayOffers[
                      (currentSlide - 1 + displayOffers.length) %
                        displayOffers.length
                    ]
                  )}
                </motion.div>

                {/* Current card (center) */}
                <motion.div
                  key={`current-${currentSlide}`}
                  custom={direction}
                  className="carousel-card carousel-card-current"
                  initial={(custom) => ({
                    opacity: 0.3,
                    scale: 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? 180 : -180,
                    zIndex: 3
                  })}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: "-50%",
                    y: "-50%",
                    translateX: 0,
                    zIndex: 5
                  }}
                  exit={(custom) => ({
                    opacity: 0.3,
                    scale: 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? -180 : 180,
                    zIndex: 3
                  })}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  {renderOfferCard(displayOffers[currentSlide])}
                </motion.div>

                {/* Next card (background right) */}
                <motion.div
                  key={`next-${currentSlide}`}
                  custom={direction}
                  className="carousel-card carousel-card-next"
                  initial={(custom) => ({
                    opacity: custom > 0 ? 0 : 0.3,
                    scale: custom > 0 ? 1 : 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? 0 : 360,
                    zIndex: 1
                  })}
                  animate={{
                    opacity: 0.3,
                    scale: 0.75,
                    x: "-50%",
                    y: "-50%",
                    translateX: 180,
                    zIndex: 1
                  }}
                  exit={(custom) => ({
                    opacity: 0,
                    scale: custom > 0 ? 0.75 : 1,
                    x: "-50%",
                    y: "-50%",
                    translateX: custom > 0 ? 180 : 360,
                    zIndex: 1
                  })}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  {renderOfferCard(
                    displayOffers[(currentSlide + 1) % displayOffers.length]
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={prevSlide}
              aria-label="Previous"
              style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              ‹
            </button>

            <button
              className="carousel-btn carousel-btn-next"
              onClick={nextSlide}
              aria-label="Next"
              style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
            >
              ›
            </button>

            {/* Dots Indicator */}
            <div className="carousel-dots">
              {displayOffers.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <motion.div
          style={{
            marginTop: 60,
            marginBottom: 0,
            padding: 40,
            background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
            backgroundSize: "200% 200%",
            animation: "goldShimmer 3s linear infinite",
            borderRadius: 16,
            textAlign: "center",
            maxWidth: 800,
            margin: "60px auto 0",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h3 style={{ fontSize: 26, marginBottom: 15, color: "#1a1a1a", fontWeight: 700 }}>💬 Beratung & Preise</h3>
          <p style={{ lineHeight: 1.7, fontSize: 15, marginBottom: 10, color: "#1a1a1a", fontWeight: 500 }}>
            Jedes Tattoo ist einzigartig - daher erstellen wir dir nach einem
            kostenlosen Beratungsgespräch ein individuelles Angebot. Der Preis
            richtet sich nach Größe, Komplexität und Zeitaufwand deines Projekts.
          </p>
          <p style={{ fontSize: 14, marginTop: 15, color: "#1a1a1a", fontWeight: 500 }}>
            📞 Kontaktiere uns für dein persönliches Angebot!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
