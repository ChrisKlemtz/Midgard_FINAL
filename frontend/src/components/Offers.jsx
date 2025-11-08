import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
    loadOffers();
  }, []);

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
      _id: "1",
      title: "Custom Tattoo",
      description:
        "Dein individuelles Design, maßgeschneidert nach deinen Wünschen. Von der ersten Skizze bis zum fertigen Kunstwerk.",
      price: "ab 100€",
      category: "Tattoo",
      icon: "🎨",
    },
    {
      _id: "2",
      title: "Cover-up",
      description:
        "Verwandle alte oder ungeliebte Tattoos in neue Meisterwerke. Unsere Spezialität!",
      price: "ab 150€",
      category: "Cover-up",
      icon: "🔄",
    },
    {
      _id: "3",
      title: "Fine Line Tattoo",
      description:
        "Filigrane, minimalistische Designs mit höchster Präzision gestochen.",
      price: "ab 80€",
      category: "Tattoo",
      icon: "✨",
    },
    {
      _id: "4",
      title: "Beratungsgespräch",
      description:
        "Kostenlose Erstberatung für dein Tattoo-Projekt. Wir besprechen Design, Platzierung und alle Details.",
      price: "Kostenlos",
      category: "Beratung",
      icon: "💬",
    },
    {
      _id: "5",
      title: "Flash Tattoos",
      description:
        "Vorgezeichnete Designs zu speziellen Preisen. Perfekt für spontane Entscheidungen!",
      price: "60-120€",
      category: "Tattoo",
      icon: "⚡",
    },
    {
      _id: "6",
      title: "Piercing Service",
      description:
        "Professionelles Piercing auf Anfrage mit höchsten Hygienestandards.",
      price: "ab 40€",
      category: "Piercing",
      icon: "💎",
    },
  ];

  const displayOffers =
    filteredOffers.length > 0 ? filteredOffers : defaultOffers;

  return (
    <section style={{ padding: "80px 20px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 42, marginBottom: 20 }}>Unsere Leistungen</h2>
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
        </div>

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

        {/* Offers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 30,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {displayOffers.map((offer) => (
            <div
              key={offer._id}
              style={{
                background: "#1b1816",
                borderRadius: 16,
                padding: 30,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(200,160,93,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Decorative gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  background:
                    "linear-gradient(135deg, rgba(200,160,93,0.1) 0%, transparent 100%)",
                  borderRadius: "0 16px 0 100%",
                }}
              />

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
                  background: "#c8a05d",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 15,
                }}
              >
                {offer.category}
              </div>

              <h3 style={{ fontSize: 24, marginBottom: 12 }}>{offer.title}</h3>

              <p
                style={{
                  color: "#ccc",
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontSize: 15,
                  minHeight: 60,
                }}
              >
                {offer.description}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 20,
                  borderTop: "1px solid #333",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#c8a05d",
                  }}
                >
                  {offer.price}
                </span>
                <button
                  className="btn"
                  style={{ padding: "8px 20px", fontSize: 14 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      "https://wa.me/491234567890?text=Ich%20interessiere%20mich%20für:%20" +
                        offer.title,
                      "_blank"
                    );
                  }}
                >
                  Anfragen
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: 60,
            padding: 40,
            background: "linear-gradient(135deg, #c8a05d 0%, #8b6f3e 100%)",
            borderRadius: 16,
            textAlign: "center",
            maxWidth: 800,
            margin: "60px auto 0",
          }}
        >
          <h3 style={{ fontSize: 26, marginBottom: 15 }}>💰 Preisgestaltung</h3>
          <p style={{ lineHeight: 1.7, fontSize: 15, marginBottom: 10 }}>
            Die angegebenen Preise sind Richtwerte. Der finale Preis hängt von
            Größe, Komplexität und Zeitaufwand ab. In einem kostenlosen
            Beratungsgespräch erstellen wir dir ein individuelles Angebot.
          </p>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            ⏱️ Mindestpreis: 60€ | Stundensatz: ab 100€
          </p>
        </div>
      </div>
    </section>
  );
}
