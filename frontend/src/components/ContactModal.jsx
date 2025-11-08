import React, { useState } from "react";
import axios from "axios";

export default function ContactModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Spam protection
  const [honeypot, setHoneypot] = useState("");
  const [formOpenTime] = useState(Date.now());

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    // Spam protection: Honeypot check
    if (honeypot) {
      console.log("Spam detected (honeypot)");
      return;
    }

    // Spam protection: Time-based validation (minimum 3 seconds)
    const timeSinceOpen = Date.now() - formOpenTime;
    if (timeSinceOpen < 3000) {
      alert("Bitte nehmen Sie sich einen Moment Zeit zum Ausfüllen des Formulars.");
      return;
    }

    // Spam protection: Rate limiting (1 minute between submissions)
    const lastSubmit = localStorage.getItem('lastContactSubmit');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
      alert("Bitte warten Sie eine Minute zwischen Anfragen.");
      return;
    }

    // Client-side validation
    if (name.trim().length < 2) {
      alert("Bitte geben Sie einen gültigen Namen ein.");
      return;
    }
    if (message.trim().length < 10) {
      alert("Bitte geben Sie eine aussagekräftigere Nachricht ein (mindestens 10 Zeichen).");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("message", message);
      if (file) form.append("file", file);

      // backend sendet WhatsApp oder fallback
      await axios.post(import.meta.env.VITE_API_URL + "/contact/send", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set rate limit timestamp
      localStorage.setItem('lastContactSubmit', Date.now().toString());

      alert("Nachricht gesendet. Wir melden uns.");
      setName(""); setMessage(""); setFile(null);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Fehler beim Senden.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
        padding: "16px",
        overflow: "auto"
      }}
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#151210",
          padding: "24px",
          borderRadius: 16,
          width: "min(600px, 100%)",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}
      >
        <h3 style={{ marginBottom: 20, fontSize: "1.5rem" }}>
          Kontakt / Termin anfragen
        </h3>

        <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
          Name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #333",
            background: "#0d0c0a",
            color: "#fff",
            fontSize: "1rem"
          }}
        />

        <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
          Nachricht
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          rows={5}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: 16,
            borderRadius: 8,
            border: "1px solid #333",
            background: "#0d0c0a",
            color: "#fff",
            fontSize: "1rem",
            resize: "vertical",
            fontFamily: "inherit"
          }}
        />

        {/* Honeypot field - hidden from users, catches bots */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0
          }}
          aria-hidden="true"
        />

        <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
          Referenzbild (optional)
        </label>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          accept="image/*"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: 20,
            borderRadius: 8,
            border: "1px solid #333",
            background: "#0d0c0a",
            color: "#ccc",
            fontSize: "0.95rem"
          }}
        />

        <div style={{
          display: "flex",
          gap: 12,
          marginTop: 20,
          flexDirection: window.innerWidth < 480 ? "column" : "row"
        }}>
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px 24px",
              fontSize: "1rem"
            }}
          >
            {loading ? "Senden..." : "Senden"}
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: 12,
              border: "2px solid #c8a05d",
              background: "transparent",
              color: "#c8a05d",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#c8a05d";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#c8a05d";
            }}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
