import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import Offers from "../components/Offers";
import SectionDivider from "../components/SectionDivider";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";
import designIcon from "../assets/icons/design_icon.svg";
import badgeIcon from "../assets/icons/badge_icon.svg";
import glovesIcon from "../assets/icons/gloves-svgrepo-com.svg";
import whatsappChatIcon from "../assets/icons/whatsapp_chat_icon.svg";
import infoCircleIcon from "../assets/icons/info-circle.svg";
import logo from "../assets/logo/midgard_single_logo_main.svg";

export default function Home() {
  const [selectedStyles, setSelectedStyles] = React.useState([]);
  const cardRefs = React.useRef({});
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );
  const [showStylesModal, setShowStylesModal] = React.useState(false);

  const styleDescriptions = {
    "Traditional": "Klassische Tattoo-Kunst mit kräftigen Linien und lebendigen Farben. Der zeitlose Old-School-Stil mit ikonischen Motiven.",
    "New School": "Moderne Interpretation des Traditional-Stils mit übertriebenen Proportionen, leuchtenden Farben und Comic-Elementen.",
    "Realismus": "Fotorealistische Darstellungen mit beeindruckenden Details und naturgetreuen Schattierungen.",
    "Cover-ups": "Professionelle Überdeckung alter Tattoos mit neuen, kunstvollen Designs, die perfekt an deine Wünsche angepasst werden.",
    "Geometric": "Präzise geometrische Muster und Formen, die Symmetrie und mathematische Schönheit vereinen.",
    "Mandala": "Spirituelle und meditative Designs mit komplexen, symmetrischen Mustern und detailreichen Ornamenten.",
    "Portraits": "Lebensechte Porträts von Menschen oder Tieren mit meisterhafter Detailgenauigkeit und emotionaler Tiefe.",
    "Fine Line": "Filigrane und minimalistische Designs mit hauchdünnen Linien für dezente und elegante Tattoos."
  };

  const toggleStyle = (style) => {
    // Im Mobile-Modal: Nur eine Stilrichtung gleichzeitig öffnen
    if (isMobile && showStylesModal) {
      setSelectedStyles(prev =>
        prev.includes(style) ? [] : [style]
      );
    } else {
      // Desktop: Mehrere gleichzeitig möglich
      setSelectedStyles(prev =>
        prev.includes(style)
          ? prev.filter(s => s !== style)
          : [...prev, style]
      );
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            const style = entry.target.dataset.style;
            if (style && selectedStyles.includes(style)) {
              setSelectedStyles(prev => prev.filter(s => s !== style));
            }
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-10px'
      }
    );

    Object.values(cardRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [selectedStyles]);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset card hover effects on scroll (mobile only)
  React.useEffect(() => {
    if (!isMobile) return;

    const resetCardStyles = () => {
      const cards = document.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
        card.style.background = "rgb(30, 0, 7)";
        card.style.borderColor = "rgba(212, 175, 55, 0.2)";
      });
    };

    window.addEventListener("scroll", resetCardStyles);
    window.addEventListener("touchmove", resetCardStyles);

    return () => {
      window.removeEventListener("scroll", resetCardStyles);
      window.removeEventListener("touchmove", resetCardStyles);
    };
  }, [isMobile]);

  return (
    <main className="home-page">
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
            marginTop: "clamp(20px, 8vh, 60px)",
          }}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.div
            variants={fadeInUp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 80,
              marginTop: -80,
            }}
          >
            <img
              src={logo}
              alt="Midgard Tattoo Studio"
              style={{
                width: "clamp(380px, 75vw, 600px)",
                height: "auto",
                filter: "brightness(0) invert(1) drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
                marginBottom: 20,
              }}
            />
            <p
              className="subtitle"
              style={{
                fontSize: "clamp(16px, 2.5vw, 20px)",
                margin: 0,
                background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              Elektrische Tätowierungen seit 2008
            </p>
          </motion.div>
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

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "calc(50% - 15px)",
            transform: "translateX(-50%)",
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))",
            }}
          >
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4e5c2">
                  <animate
                    attributeName="stop-color"
                    values="#f4e5c2; #d4af37; #f4e5c2"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="#d4af37">
                  <animate
                    attributeName="stop-color"
                    values="#d4af37; #f4e5c2; #d4af37"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#f4e5c2">
                  <animate
                    attributeName="stop-color"
                    values="#f4e5c2; #d4af37; #f4e5c2"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
            <path
              d="M12 4L12 20M12 20L18 14M12 20L6 14"
              stroke="url(#arrowGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </section>

      <div style={{ display: !isMobile ? "block" : "none" }}>
        <SectionDivider />
      </div>

      {/* Gallery Preview */}
      <section className="container" style={{ padding: "0 20px", display: !isMobile ? "block" : "none" }}>
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
              display: !isMobile ? "block" : "none",
            }}
          >
            Entdecke eine Auswahl unserer neuesten Tattoo-Kunstwerke
          </p>
        </motion.div>

        {/* Desktop: Gallery Grid */}
        <div style={{ display: !isMobile ? "block" : "none" }}>
          <Gallery />
          <motion.div
            style={{ marginTop: 40, textAlign: "center" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            <Link
              to="/galerie"
              className="btn"
              style={{ padding: "12px 30px" }}
            >
              Komplette Galerie ansehen →
            </Link>
          </motion.div>
        </div>

        {/* Mobile/Tablet: Circular Button */}
        <motion.div
          style={{
            display: isMobile ? "flex" : "none",
            justifyContent: "center",
            marginTop: 20,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <Link
            to="/galerie"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
              backgroundSize: "200% 200%",
              animation: "goldShimmer 3s linear infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
              color: "#1a1a1a",
              border: "none",
              boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(212, 175, 55, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.4)";
            }}
          >
            Zur Galerie
          </Link>
        </motion.div>
      </section>

      <SectionDivider />

      {/* Offers Section */}
      <Offers />

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
                className="feature-card"
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

      {/* Style Section - Desktop */}
      {!isMobile && (
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
                "Cover-ups",
                "Geometric",
                "Mandala",
                "Portraits",
                "Fine Line",
              ].map((style, i) => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <motion.div
                    key={i}
                    ref={(el) => (cardRefs.current[style] = el)}
                    data-style={style}
                    style={{
                      position: "relative",
                    }}
                    variants={staggerItem}
                  >
                    <motion.div
                      style={{
                        background: isSelected ? "rgb(43, 0, 10)" : "rgb(30, 0, 7)",
                        padding: 20,
                        borderRadius: isSelected ? "10px 10px 0 0" : "10px",
                        textAlign: "center",
                        border: "2px solid " + (isSelected ? "#d4af37" : "rgba(212, 175, 55, 0.3)"),
                        borderBottom: isSelected ? "none" : "2px solid rgba(212, 175, 55, 0.3)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleStyle(style)}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgb(43, 0, 10)";
                          e.currentTarget.style.borderColor = "#d4af37";
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgb(30, 0, 7)";
                          e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.3)";
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }
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

                    <motion.div
                      initial={false}
                      animate={{
                        height: isSelected ? "auto" : 0,
                        opacity: isSelected ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{
                        overflow: "hidden",
                        background: "rgb(43, 0, 10)",
                        borderRadius: "0 0 10px 10px",
                        border: isSelected ? "2px solid #d4af37" : "none",
                        borderTop: "none",
                      }}
                    >
                      {isSelected && (
                        <div style={{
                          padding: "15px",
                          color: "#ccc",
                          fontSize: 13,
                          lineHeight: 1.6,
                          textAlign: "left",
                        }}>
                          {styleDescriptions[style]}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Style Section - Mobile/Tablet (Button) */}
      {isMobile && (
        <section style={{ padding: "80px 20px", textAlign: "center" }}>
          <div className="container">
            <motion.div
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
                  margin: "0 auto 40px",
                }}
              >
                Von traditionell bis modern – wir beherrschen verschiedene
                Tattoo-Stile
              </p>
              <motion.button
                onClick={() => setShowStylesModal(true)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                  backgroundSize: "200% 200%",
                  animation: "goldShimmer 3s linear infinite",
                  border: "3px solid #c9a84a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  padding: 0,
                  position: "relative",
                  boxShadow: `
                    0 8px 16px rgba(0, 0, 0, 0.4),
                    0 4px 8px rgba(0, 0, 0, 0.3),
                    inset 0 -3px 8px rgba(180, 140, 50, 0.6),
                    inset 0 3px 8px rgba(255, 240, 200, 0.6),
                    0 0 20px rgba(212, 175, 55, 0.3)
                  `,
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `
                    0 10px 20px rgba(0, 0, 0, 0.5),
                    0 6px 10px rgba(0, 0, 0, 0.35),
                    inset 0 -3px 10px rgba(180, 140, 50, 0.7),
                    inset 0 3px 10px rgba(255, 240, 200, 0.7),
                    0 0 30px rgba(212, 175, 55, 0.5)
                  `,
                  transform: "translateY(-4px)"
                }}
                whileTap={{
                  scale: 0.98,
                  boxShadow: `
                    0 2px 4px rgba(0, 0, 0, 0.3),
                    0 1px 2px rgba(0, 0, 0, 0.2),
                    inset 0 3px 8px rgba(0, 0, 0, 0.3),
                    inset 0 -2px 5px rgba(255, 240, 200, 0.3),
                    0 0 10px rgba(212, 175, 55, 0.2)
                  `,
                  transform: "translateY(1px)"
                }}
              >
                <img
                  src={infoCircleIcon}
                  alt="Stilrichtungen anzeigen"
                  style={{
                    width: 40,
                    height: 40,
                    filter: "brightness(0) saturate(100%) drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Styles Modal - Mobile/Tablet */}
      {isMobile && showStylesModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.95)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            overflowY: "auto",
          }}
          onClick={() => setShowStylesModal(false)}
        >
          <div
            style={{
              background: "#0d0c0a",
              borderRadius: 16,
              maxWidth: 600,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 30,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowStylesModal(false)}
              style={{
                position: "absolute",
                top: 15,
                right: 15,
                background: "transparent",
                border: "none",
                color: "#d4af37",
                fontSize: 32,
                cursor: "pointer",
                padding: 5,
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h2 style={{
              fontSize: 32,
              marginBottom: 30,
              textAlign: "center",
              background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "goldShimmer 3s linear infinite",
            }}>
              Unsere Stilrichtungen
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              {[
                "Traditional",
                "New School",
                "Realismus",
                "Cover-ups",
                "Geometric",
                "Mandala",
                "Portraits",
                "Fine Line",
              ].map((style, i) => {
                const isSelected = selectedStyles.includes(style);
                return (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        background: isSelected ? "rgb(43, 0, 10)" : "rgb(30, 0, 7)",
                        padding: 20,
                        borderRadius: isSelected ? "10px 10px 0 0" : "10px",
                        textAlign: "center",
                        border: "2px solid " + (isSelected ? "#d4af37" : "rgba(212, 175, 55, 0.3)"),
                        borderBottom: isSelected ? "none" : "2px solid rgba(212, 175, 55, 0.3)",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleStyle(style)}
                    >
                      <h3 style={{
                        fontSize: 18,
                        background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                        backgroundSize: "200% 200%",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "goldShimmer 3s linear infinite",
                      }}>{style}</h3>
                    </div>

                    {isSelected && (
                      <div style={{
                        padding: "15px",
                        color: "#ccc",
                        fontSize: 14,
                        lineHeight: 1.6,
                        background: "rgb(43, 0, 10)",
                        borderRadius: "0 0 10px 10px",
                        border: "2px solid #d4af37",
                        borderTop: "none",
                      }}>
                        {styleDescriptions[style]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <SectionDivider />

      {/* CTA Section */}
      <section
        style={{
          position: "relative",
          padding: "5px",
          background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
          backgroundSize: "200% 200%",
          animation: "goldShimmer 3s linear infinite",
        }}
      >
        <div
          style={{
            background: "rgb(30, 0, 7)",
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
            <h2 style={{ fontSize: 42, marginBottom: 20, color: "#f4e5c2", fontWeight: 700 }}>
              Bereit für dein Traumtattoo?
            </h2>
            <p
              style={{
                fontSize: 18,
                marginBottom: 35,
                maxWidth: 700,
                margin: "0 auto 35px",
                lineHeight: 1.7,
                color: "#ccc",
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
                  background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 25%, #f4e5c2 50%, #d4af37 75%, #f4e5c2 100%)",
                  backgroundSize: "200% 200%",
                  animation: "goldShimmer 3s linear infinite",
                  color: "#1a1a1a",
                  padding: "15px 35px",
                  fontSize: 16,
                  border: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(212, 175, 55, 0.6)",
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
                border: "2px solid #d4af37",
                padding: "15px 35px",
                fontSize: 16,
                color: "#f4e5c2",
              }}
            >
              Mehr über uns
            </Link>
            <Link
              to="/faq"
              className="btn"
              style={{
                background: "transparent",
                border: "2px solid #d4af37",
                padding: "15px 35px",
                fontSize: 16,
                color: "#f4e5c2",
              }}
            >
              Häufige Fragen
            </Link>
          </div>
        </motion.div>
        </div>
      </section>
    </main>
  );
}
