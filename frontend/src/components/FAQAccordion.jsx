import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  useEffect(() => {
    loadFaqs();
  }, []);

  async function loadFaqs() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/faqs");
      setFaqs(res.data);
    } catch (error) {
      console.error("Fehler beim Laden der FAQs:", error);
    }
  }

  const categories = ["Alle", ...new Set(faqs.map((f) => f.category))];
  const filteredFaqs =
    selectedCategory === "Alle"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  function toggleFaq(id) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Category Filter */}
      {categories.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 20px",
                background:
                  selectedCategory === cat ? "#c8a05d" : "transparent",
                border: `2px solid ${
                  selectedCategory === cat ? "#c8a05d" : "#555"
                }`,
                borderRadius: 20,
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
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

      {/* FAQ Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div
              key={faq._id}
              style={{
                background: "#1b1816",
                borderRadius: 12,
                overflow: "hidden",
                border:
                  openId === faq._id
                    ? "2px solid #c8a05d"
                    : "2px solid transparent",
                transition: "all 0.3s ease",
              }}
            >
              <button
                onClick={() => toggleFaq(faq._id)}
                style={{
                  width: "100%",
                  padding: 20,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  color: "#fff",
                }}
              >
                <div>
                  {faq.category && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "#c8a05d",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {faq.category}
                    </span>
                  )}
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                    {faq.question}
                  </h3>
                </div>
                <div
                  style={{
                    fontSize: 24,
                    color: "#c8a05d",
                    transform:
                      openId === faq._id ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                    marginLeft: 15,
                  }}
                >
                  ▼
                </div>
              </button>

              {openId === faq._id && (
                <div
                  style={{
                    padding: "0 20px 20px 20px",
                    color: "#ccc",
                    lineHeight: 1.7,
                    fontSize: 15,
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
            <p>Keine FAQs in dieser Kategorie gefunden.</p>
          </div>
        )}
      </div>

      {filteredFaqs.length === 0 && faqs.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 60,
            background: "#1b1816",
            borderRadius: 12,
          }}
        >
          <h3 style={{ fontSize: 20, marginBottom: 10 }}>
            Noch keine FAQs verfügbar
          </h3>
          <p style={{ color: "#999" }}>
            Hast du Fragen? Kontaktiere uns direkt!
          </p>
        </div>
      )}
    </div>
  );
}
