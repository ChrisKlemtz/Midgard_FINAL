import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from "../utils/animations";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Fehler beim Laden der Events:", error);
    } finally {
      setLoading(false);
    }
  }

  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date() && e.active
  );
  const pastEvents = events.filter(
    (e) => new Date(e.date) < new Date() && e.active
  );

  if (loading) {
    return (
      <section
        className="container"
        style={{ padding: "100px 20px", textAlign: "center" }}
      >
        <h2>Lade Events...</h2>
      </section>
    );
  }

  return (
    <section className="container" style={{ padding: "100px 20px" }}>
      <motion.div
        style={{ textAlign: "center", marginBottom: 60 }}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 style={{ fontSize: 48, marginBottom: 20 }}>Events & Termine</h1>
        <p
          style={{
            fontSize: 18,
            color: "#ccc",
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          Besuche uns auf Conventions, Guest Spots und besonderen Events. Hier
          findest du alle kommenden und vergangenen Termine.
        </p>
      </motion.div>

      {upcomingEvents.length > 0 && (
        <div style={{ marginBottom: 60 }}>
          <motion.h2
            style={{ fontSize: 36, marginBottom: 30, textAlign: "center" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            Kommende Events
          </motion.h2>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 30,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {upcomingEvents.map((event) => (
              <motion.div
                key={event._id}
                style={{
                  background: "#1b1816",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                variants={staggerItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(200,160,93,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{ width: "100%", height: 200, objectFit: "cover" }}
                  />
                )}
                <div style={{ padding: 25 }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      background: "#c8a05d",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 15,
                    }}
                  >
                    {event.type}
                  </div>
                  <h3 style={{ fontSize: 24, marginBottom: 10 }}>
                    {event.title}
                  </h3>
                  <div
                    style={{ fontSize: 14, color: "#999", marginBottom: 15 }}
                  >
                    📅{" "}
                    {new Date(event.date).toLocaleDateString("de-DE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {event.location && (
                    <div
                      style={{ fontSize: 14, color: "#999", marginBottom: 15 }}
                    >
                      📍 {event.location}
                    </div>
                  )}
                  {event.description && (
                    <p style={{ color: "#ccc", lineHeight: 1.6 }}>
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {upcomingEvents.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            background: "#1b1816",
            borderRadius: 16,
            marginBottom: 60,
          }}
        >
          <h3 style={{ fontSize: 24, marginBottom: 10 }}>
            Keine kommenden Events
          </h3>
          <p style={{ color: "#999" }}>
            Schau bald wieder vorbei für neue Termine!
          </p>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div>
          <motion.h2
            style={{
              fontSize: 36,
              marginBottom: 30,
              textAlign: "center",
              color: "#999",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
          >
            Vergangene Events
          </motion.h2>
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            {pastEvents.map((event) => (
              <motion.div
                key={event._id}
                style={{
                  background: "#1b1816",
                  borderRadius: 12,
                  overflow: "hidden",
                  opacity: 0.7,
                }}
                variants={staggerItem}
              >
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      filter: "grayscale(50%)",
                    }}
                  />
                )}
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>
                    {event.type}
                  </div>
                  <h4 style={{ fontSize: 18, marginBottom: 8 }}>
                    {event.title}
                  </h4>
                  <div style={{ fontSize: 13, color: "#777" }}>
                    {new Date(event.date).toLocaleDateString("de-DE")}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
