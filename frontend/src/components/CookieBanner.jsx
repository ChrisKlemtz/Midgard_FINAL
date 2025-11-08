import React, { useState } from "react";

export default function CookieBanner() {
  const accepted = localStorage.getItem("cookies") === "true";
  const [open, setOpen] = useState(!accepted);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  function acceptAll() {
    localStorage.setItem("cookies", "true");
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
      })
    );
    setOpen(false);
  }

  function savePreferences() {
    localStorage.setItem("cookies", "true");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setShowSettings(false);
    setOpen(false);
  }

  function acceptEssentialOnly() {
    localStorage.setItem("cookies", "true");
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
      })
    );
    setOpen(false);
  }

  if (!open) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          background: "#1b1816",
          padding: 20,
          borderRadius: 12,
          zIndex: 300,
          width: 360,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        <h3 style={{ marginBottom: 12, fontSize: 18, fontWeight: 700 }}>
          🍪 Cookie-Einstellungen
        </h3>
        <div
          style={{
            marginBottom: 16,
            fontSize: 14,
            lineHeight: 1.6,
            color: "#ccc",
          }}
        >
          Wir nutzen Cookies, um deine Erfahrung zu verbessern. Du kannst
          wählen, welche Kategorien du zulässt.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            className="btn"
            onClick={acceptAll}
            style={{ width: "100%", padding: 12 }}
          >
            Alle akzeptieren
          </button>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              width: "100%",
              padding: 12,
              background: "transparent",
              border: "1px solid #c8a05d",
              borderRadius: 8,
              color: "#c8a05d",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Einstellungen
          </button>
          <button
            onClick={acceptEssentialOnly}
            style={{
              width: "100%",
              padding: 12,
              background: "transparent",
              border: "1px solid #555",
              borderRadius: 8,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Nur notwendige
          </button>
        </div>
      </div>

      {showSettings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            style={{
              background: "#1b1816",
              padding: 30,
              borderRadius: 16,
              maxWidth: 600,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: 20 }}>Cookie-Präferenzen</h2>

            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  background: "#252220",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <div>
                  <h3 style={{ marginBottom: 5, fontSize: 16 }}>
                    Notwendige Cookies
                  </h3>
                  <p style={{ fontSize: 13, color: "#999" }}>
                    Erforderlich für die Grundfunktionen der Website
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.essential}
                  disabled
                  style={{ width: 20, height: 20, cursor: "not-allowed" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  background: "#252220",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <div>
                  <h3 style={{ marginBottom: 5, fontSize: 16 }}>
                    Analyse-Cookies
                  </h3>
                  <p style={{ fontSize: 13, color: "#999" }}>
                    Helfen uns zu verstehen, wie Besucher mit der Website
                    interagieren
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                  style={{ width: 20, height: 20, cursor: "pointer" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 15,
                  background: "#252220",
                  borderRadius: 8,
                }}
              >
                <div>
                  <h3 style={{ marginBottom: 5, fontSize: 16 }}>
                    Marketing-Cookies
                  </h3>
                  <p style={{ fontSize: 13, color: "#999" }}>
                    Werden verwendet, um relevante Werbung anzuzeigen
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                  style={{ width: 20, height: 20, cursor: "pointer" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn"
                onClick={savePreferences}
                style={{ flex: 1, padding: 12 }}
              >
                Auswahl speichern
              </button>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  background: "transparent",
                  border: "1px solid #555",
                  borderRadius: 8,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
