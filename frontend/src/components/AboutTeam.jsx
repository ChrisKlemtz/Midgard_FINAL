import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";
import mariaPortrait from "../assets/images/team/maria_portrait_small.png";
import robertPortrait from "../assets/images/team/robert_portrait_small.png";
import lottiPortrait from "../assets/images/team/lotti_portrait_small.png";
import olliPortrait from "../assets/images/team/olli_portrait_small.png";

export default function AboutTeam() {
  const [expandedCards, setExpandedCards] = React.useState({});
  const [expandedOlli, setExpandedOlli] = React.useState(false);

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const team = [
    {
      name: "Lotti",
      role: "Die Chefin",
      image: lottiPortrait,
      description:
        "Lotti ist unsere treue Begleiterin und sorgt für gute Stimmung im Studio. Sie liebt Streicheleinheiten und ist immer zur Stelle, wenn jemand Ablenkung braucht.",
      specialties: ["Streicheln", "Gute Laune", "Leckerlis", "Seelentröster"],
      instagram: "@little_lotti_dachshund",
      instagramUrl: "https://www.instagram.com/little_lotti_dachshund/",
    },
    {
      name: "Robert",
      role: "Tattoo Artist",
      image: robertPortrait,
      description:
        "Robert ist Experte für nordische Motive, Traditional und New School. Seine kraftvollen Designs und satten Farben machen jedes Tattoo zu einem Kunstwerk.",
      specialties: [
        "Traditional",
        "New School",
        "Nordische Motive",
        "Cover-ups",
      ],
      instagram: "@midgard_tattoo_stralsund",
      instagramUrl: "https://www.instagram.com/midgard_tattoo_stralsund/",
    },
    {
      name: "Maria",
      role: "Tattoo Artist",
      image: mariaPortrait,
      description:
        "Maria ist spezialisiert auf filigrane Fine-Line Tattoos und realistische Porträts. Mit über 10 Jahren Erfahrung bringt sie deine Vision mit höchster Präzision auf die Haut.",
      specialties: ["Fine Line", "Realismus", "Portraits", "Blumen"],
      instagram: "@maria_post_tattoo",
      instagramUrl: "https://www.instagram.com/maria_post_tattoo/",
    },
  ];

  return (
    <section style={{ padding: "80px 20px", background: "#0d0c0a" }}>
      <div className="container">
        <motion.div
          style={{ textAlign: "center", marginBottom: 60 }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <h2 style={{ fontSize: 72, marginBottom: 20 }}>Das sind wir!</h2>
          <p
            style={{
              fontSize: 18,
              color: "#ccc",
              maxWidth: 700,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Lerne die kreativen Köpfe und Hände hinter Midgard Tattoo kennen.
            Jeder von uns bringt seine eigene Vision und Leidenschaft mit.
          </p>
        </motion.div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40,
            maxWidth: 1200,
            margin: "0 auto",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              style={{
                background: "#1b1816",
                borderRadius: 16,
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
              variants={staggerItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(200,160,93,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Team-Bild */}
              <div
                style={{
                  width: "100%",
                  height: 350,
                  background: member.image
                    ? "#1b1816"
                    : `linear-gradient(135deg, #c8a05d ${
                        index * 20
                      }%, #8b6f3e ${100 - index * 20}%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>{member.name === "Lotti" ? "🐕" : "👤"}</span>
                )}
              </div>

              <div style={{ padding: 30 }}>
                <div
                  style={{
                    marginBottom: expandedCards[index] ? 20 : 0,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                  onClick={() => toggleCard(index)}
                >
                  <div>
                    <h3 style={{ fontSize: 28, marginBottom: 5 }}>
                      {member.name}
                    </h3>
                    <p
                      style={{
                        color: "#c8a05d",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      color: "#c8a05d",
                      transform: expandedCards[index] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    ▼
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: expandedCards[index] ? "1000px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      color: "#ccc",
                      lineHeight: 1.7,
                      marginBottom: 20,
                      marginTop: 20,
                      fontSize: 15,
                    }}
                  >
                    {member.description}
                  </p>

                  <div style={{ marginBottom: 20 }}>
                    <h4
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        marginBottom: 10,
                        color: "#c8a05d",
                        textTransform: "uppercase",
                      }}
                    >
                      Spezialgebiete
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {member.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#2a2623",
                            padding: "6px 12px",
                            borderRadius: 20,
                            fontSize: 13,
                            color: "#ddd",
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={member.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: 12,
                    background: "#2a2623",
                    borderRadius: 8,
                    textAlign: "center",
                    marginTop: expandedCards[index] ? 0 : 20,
                    textDecoration: "none",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#3a3633";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#2a2623";
                  }}
                >
                  <span style={{ fontSize: 13, color: "#999" }}>
                    📸 Instagram:{" "}
                  </span>
                  <span
                    style={{
                      color: "#c8a05d",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {member.instagram}
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Piercing Service Info */}
        <motion.div
          style={{
            marginTop: 60,
            padding: 5,
            background: "linear-gradient(135deg, #4a90e2 0%, #1e3a8a 25%, #60a5fa 50%, #1e3a8a 75%, #4a90e2 100%)",
            backgroundSize: "200% 200%",
            animation: "goldShimmer 3s linear infinite",
            borderRadius: 16,
            maxWidth: 800,
            margin: "60px auto 0",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div
            style={{
              background: "#1b1816",
              padding: 40,
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: 24, marginBottom: 15 }}>
              💎 Piercing-Service
            </h3>
            <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: 15 }}>
              Professionelles Piercing auf Anfrage! Wir arbeiten mit erfahrenen
              Piercern zusammen, die höchste Hygienestandards einhalten.
              Kontaktiere uns für einen individuellen Termin.
            </p>
          </div>
        </motion.div>

        {/* Piercer Olli Card */}
        <motion.div
          style={{
            marginTop: 40,
            maxWidth: 500,
            margin: "40px auto 0",
          }}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <div
            style={{
              background: "#1b1816",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #333",
            }}
          >
            {/* Olli's Bild */}
            <div
              style={{
                width: "100%",
                height: 350,
                background: "#1b1816",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={olliPortrait}
                alt="Olli"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div style={{ padding: 30 }}>
              <div
                style={{
                  marginBottom: expandedOlli ? 20 : 0,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
                onClick={() => setExpandedOlli(!expandedOlli)}
              >
                <div>
                  <h3 style={{ fontSize: 28, marginBottom: 5 }}>Olli</h3>
                  <p
                    style={{
                      color: "#4a90e2",
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    Piercer
                  </p>
                </div>
                <div
                  style={{
                    fontSize: 24,
                    color: "#4a90e2",
                    transform: expandedOlli ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  ▼
                </div>
              </div>

              <div
                style={{
                  maxHeight: expandedOlli ? "1000px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p
                  style={{
                    color: "#ccc",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    marginTop: 20,
                    fontSize: 15,
                  }}
                >
                  Olli ist unser Experte für professionelles Piercing. Mit jahrelanger
                  Erfahrung und höchsten Hygienestandards sorgt er dafür, dass dein
                  Piercing perfekt sitzt und sicher verheilt.
                </p>

                <div style={{ marginBottom: 20 }}>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      marginBottom: 10,
                      color: "#4a90e2",
                      textTransform: "uppercase",
                    }}
                  >
                    Spezialgebiete
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <span
                      style={{
                        background: "#2a2623",
                        padding: "6px 12px",
                        borderRadius: 20,
                        fontSize: 13,
                        color: "#ddd",
                      }}
                    >
                      Piercings ;)
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="https://www.instagram.com/piercbar/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: 12,
                  background: "#2a2623",
                  borderRadius: 8,
                  textAlign: "center",
                  marginTop: expandedOlli ? 0 : 20,
                  textDecoration: "none",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#3a3633";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#2a2623";
                }}
              >
                <span style={{ fontSize: 13, color: "#999" }}>📸 Instagram: </span>
                <span
                  style={{
                    color: "#4a90e2",
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  @piercbar
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
