import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";
import mariaPortrait from "../assets/images/team/maria_portrait_small.png";
import robertPortrait from "../assets/images/team/robert_portrait_small.png";

export default function AboutTeam() {
  const team = [
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
      instagram: "@robert_midgard_ink",
    },
    {
      name: "Maria",
      role: "Tattoo Artist",
      image: mariaPortrait,
      description:
        "Maria ist spezialisiert auf filigrane Fine-Line Tattoos und realistische Porträts. Mit über 10 Jahren Erfahrung bringt sie deine Vision mit höchster Präzision auf die Haut.",
      specialties: ["Fine Line", "Realismus", "Portraits", "Blumen"],
      instagram: "@maria_midgard_tattoo",
    },
    {
      name: "Lotti",
      role: "Studio-Hund & Maskottchen",
      image: null,
      description:
        "Lotti ist unsere treue Begleiterin und sorgt für gute Stimmung im Studio. Sie liebt Streicheleinheiten und ist immer zur Stelle, wenn jemand Ablenkung braucht.",
      specialties: ["Streicheln", "Gute Laune", "Leckerlis", "Seelentröster"],
      instagram: "@lotti_midgard_dog",
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
          <h2 style={{ fontSize: 42, marginBottom: 20 }}>Unser Team</h2>
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
                <div style={{ marginBottom: 20 }}>
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

                <p
                  style={{
                    color: "#ccc",
                    lineHeight: 1.7,
                    marginBottom: 20,
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

                <div
                  style={{
                    padding: 12,
                    background: "#2a2623",
                    borderRadius: 8,
                    textAlign: "center",
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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Piercing Service Info */}
        <motion.div
          style={{
            marginTop: 60,
            padding: 40,
            background: "#1b1816",
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
          <h3 style={{ fontSize: 24, marginBottom: 15 }}>
            💎 Piercing-Service
          </h3>
          <p style={{ color: "#ccc", lineHeight: 1.7, fontSize: 15 }}>
            Professionelles Piercing auf Anfrage! Wir arbeiten mit erfahrenen
            Piercern zusammen, die höchste Hygienestandards einhalten.
            Kontaktiere uns für einen individuellen Termin.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
