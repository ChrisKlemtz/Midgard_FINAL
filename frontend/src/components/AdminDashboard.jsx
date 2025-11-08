import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem("admin_token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("gallery");

  // Gallery State
  const [images, setImages] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadArtist, setUploadArtist] = useState("Andere");
  const [uploadTags, setUploadTags] = useState("");

  // FAQ State
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "Allgemein",
  });

  // Events State
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    type: "Sonstiges",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("admin_token", res.data.token);
      setToken(res.data.token);
      alert("Eingeloggt");
    } catch {
      alert("Login fehlgeschlagen");
    }
  }

  function logout() {
    localStorage.removeItem("admin_token");
    setToken("");
  }

  useEffect(() => {
    if (token) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, activeTab]);

  async function loadData() {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    try {
      if (activeTab === "gallery") {
        const res = await axios.get(`${apiUrl}/admin/galleries`, config);
        setImages(res.data);
      } else if (activeTab === "faq") {
        const res = await axios.get(`${apiUrl}/admin/faqs`, config);
        setFaqs(res.data);
      } else if (activeTab === "events") {
        const res = await axios.get(`${apiUrl}/admin/events`, config);
        setEvents(res.data);
      }
    } catch (error) {
      console.error("Fehler beim Laden:", error);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadFile) return alert("Bitte Datei auswählen");

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);
    formData.append("artist", uploadArtist);
    formData.append("tags", uploadTags);

    try {
      await axios.post(`${apiUrl}/admin/galleries`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Bild hochgeladen");
      setUploadFile(null);
      setUploadTitle("");
      setUploadTags("");
      loadData();
    } catch {
      alert("Upload fehlgeschlagen");
    }
  }

  async function deleteImage(id) {
    if (!confirm("Bild wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/admin/galleries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch {
      alert("Löschen fehlgeschlagen");
    }
  }

  async function addFaq(e) {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/admin/faqs`, newFaq, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewFaq({ question: "", answer: "", category: "Allgemein" });
      loadData();
    } catch {
      alert("FAQ hinzufügen fehlgeschlagen");
    }
  }

  async function deleteFaq(id) {
    if (!confirm("FAQ wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/admin/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch {
      alert("Löschen fehlgeschlagen");
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/admin/events`, newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        type: "Sonstiges",
      });
      loadData();
    } catch {
      alert("Event hinzufügen fehlgeschlagen");
    }
  }

  async function deleteEvent(id) {
    if (!confirm("Event wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadData();
    } catch {
      alert("Löschen fehlgeschlagen");
    }
  }

  if (!token) {
    return (
      <section
        className="container"
        style={{ maxWidth: 500, margin: "100px auto", padding: 40 }}
      >
        <h1 style={{ marginBottom: 30, textAlign: "center" }}>Admin Login</h1>
        <form
          onSubmit={login}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label
              style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
            >
              Benutzer
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #555",
              }}
              required
            />
          </div>
          <div>
            <label
              style={{ display: "block", marginBottom: 8, fontWeight: 600 }}
            >
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #555",
              }}
              required
            />
          </div>
          <button className="btn" type="submit" style={{ marginTop: 10 }}>
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section
      className="container"
      style={{ padding: "40px 20px", minHeight: "100vh" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          onClick={logout}
          className="btn"
          style={{ background: "#d32f2f" }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 30,
          borderBottom: "2px solid #333",
          paddingBottom: 10,
        }}
      >
        <button
          onClick={() => setActiveTab("gallery")}
          style={{
            padding: "10px 20px",
            background: activeTab === "gallery" ? "#c8a05d" : "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Galerie
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          style={{
            padding: "10px 20px",
            background: activeTab === "faq" ? "#c8a05d" : "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          FAQ
        </button>
        <button
          onClick={() => setActiveTab("events")}
          style={{
            padding: "10px 20px",
            background: activeTab === "events" ? "#c8a05d" : "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          Events
        </button>
      </div>

      {activeTab === "gallery" && (
        <div>
          <h2 style={{ marginBottom: 20 }}>Galerie verwalten</h2>
          <form
            onSubmit={handleUpload}
            style={{
              background: "#1b1816",
              padding: 20,
              borderRadius: 12,
              marginBottom: 40,
            }}
          >
            <h3 style={{ marginBottom: 15 }}>Neues Bild hochladen</h3>
            <div style={{ display: "grid", gap: 15 }}>
              <input
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
                accept="image/*"
                required
              />
              <input
                placeholder="Titel"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              />
              <select
                value={uploadArtist}
                onChange={(e) => setUploadArtist(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              >
                <option value="Maria">Maria</option>
                <option value="Robert">Robert</option>
                <option value="Andere">Andere</option>
              </select>
              <input
                placeholder="Tags (kommagetrennt)"
                value={uploadTags}
                onChange={(e) => setUploadTags(e.target.value)}
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              />
              <button type="submit" className="btn">
                Hochladen
              </button>
            </div>
          </form>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {images.map((img) => (
              <div
                key={img._id}
                style={{
                  background: "#1b1816",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <div style={{ padding: 10 }}>
                  <p style={{ fontWeight: 600, marginBottom: 5 }}>
                    {img.title || "Ohne Titel"}
                  </p>
                  <p style={{ fontSize: 14, color: "#999", marginBottom: 10 }}>
                    {img.artist}
                  </p>
                  <button
                    onClick={() => deleteImage(img._id)}
                    style={{
                      width: "100%",
                      padding: 8,
                      background: "#d32f2f",
                      border: "none",
                      borderRadius: 8,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div>
          <h2 style={{ marginBottom: 20 }}>FAQ verwalten</h2>
          <form
            onSubmit={addFaq}
            style={{
              background: "#1b1816",
              padding: 20,
              borderRadius: 12,
              marginBottom: 40,
            }}
          >
            <h3 style={{ marginBottom: 15 }}>Neue FAQ hinzufügen</h3>
            <div style={{ display: "grid", gap: 15 }}>
              <input
                placeholder="Frage"
                value={newFaq.question}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
                required
              />
              <textarea
                placeholder="Antwort"
                value={newFaq.answer}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                  minHeight: 100,
                }}
                required
              />
              <select
                value={newFaq.category}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, category: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              >
                <option value="Allgemein">Allgemein</option>
                <option value="Tattoo">Tattoo</option>
                <option value="Piercing">Piercing</option>
                <option value="Hygiene">Hygiene</option>
                <option value="Termin">Termin</option>
              </select>
              <button type="submit" className="btn">
                Hinzufügen
              </button>
            </div>
          </form>

          <div style={{ display: "grid", gap: 15 }}>
            {faqs.map((faq) => (
              <div
                key={faq._id}
                style={{ background: "#1b1816", padding: 20, borderRadius: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: "#c8a05d", fontWeight: 600 }}
                  >
                    {faq.category}
                  </span>
                  <button
                    onClick={() => deleteFaq(faq._id)}
                    style={{
                      padding: "5px 15px",
                      background: "#d32f2f",
                      border: "none",
                      borderRadius: 8,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Löschen
                  </button>
                </div>
                <h3 style={{ marginBottom: 10 }}>{faq.question}</h3>
                <p style={{ color: "#ccc" }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div>
          <h2 style={{ marginBottom: 20 }}>Events verwalten</h2>
          <form
            onSubmit={addEvent}
            style={{
              background: "#1b1816",
              padding: 20,
              borderRadius: 12,
              marginBottom: 40,
            }}
          >
            <h3 style={{ marginBottom: 15 }}>Neues Event hinzufügen</h3>
            <div style={{ display: "grid", gap: 15 }}>
              <input
                placeholder="Titel"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
                required
              />
              <textarea
                placeholder="Beschreibung"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                  minHeight: 80,
                }}
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
                required
              />
              <input
                placeholder="Ort"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              />
              <select
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #555",
                }}
              >
                <option value="Tattoo Convention">Tattoo Convention</option>
                <option value="Guest Spot">Guest Spot</option>
                <option value="Workshop">Workshop</option>
                <option value="Special Offer">Special Offer</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
              <button type="submit" className="btn">
                Hinzufügen
              </button>
            </div>
          </form>

          <div style={{ display: "grid", gap: 15 }}>
            {events.map((event) => (
              <div
                key={event._id}
                style={{ background: "#1b1816", padding: 20, borderRadius: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 12,
                        color: "#c8a05d",
                        fontWeight: 600,
                      }}
                    >
                      {event.type}
                    </span>
                    <p style={{ fontSize: 14, color: "#999", marginTop: 5 }}>
                      {new Date(event.date).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEvent(event._id)}
                    style={{
                      padding: "5px 15px",
                      background: "#d32f2f",
                      border: "none",
                      borderRadius: 8,
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Löschen
                  </button>
                </div>
                <h3 style={{ marginBottom: 10 }}>{event.title}</h3>
                <p style={{ color: "#ccc", marginBottom: 5 }}>
                  {event.description}
                </p>
                {event.location && (
                  <p style={{ fontSize: 14, color: "#999" }}>
                    📍 {event.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
