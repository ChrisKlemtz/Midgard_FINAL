import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("gallery");

  // Gallery State
  const [images, setImages] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadArtist, setUploadArtist] = useState("Maria");
  const [uploading, setUploading] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

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
  const [eventFile, setEventFile] = useState(null);
  const [isDraggingEvent, setIsDraggingEvent] = useState(false);

  // Certificates State
  const [certificates, setCertificates] = useState([]);
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    description: "",
    issuer: "",
    date: "",
    category: "Hygiene",
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [isDraggingCertificate, setIsDraggingCertificate] = useState(false);

  // Offers State
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    price: "",
    validUntil: "",
    category: "Tattoo",
  });

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  async function loadData() {
    try {
      if (activeTab === "gallery") {
        const res = await axios.get(`${apiUrl}/gallery`);
        setImages(res.data);
      } else if (activeTab === "faq") {
        const res = await axios.get(`${apiUrl}/faqs`);
        setFaqs(res.data);
      } else if (activeTab === "events") {
        const res = await axios.get(`${apiUrl}/events`);
        setEvents(res.data);
      } else if (activeTab === "certificates") {
        const res = await axios.get(`${apiUrl}/certificates`);
        setCertificates(res.data);
      } else if (activeTab === "offers") {
        const res = await axios.get(`${apiUrl}/offers`);
        setOffers(res.data);
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
    formData.append("tags", ""); // Keine Tags mehr

    setUploading(true);
    try {
      await axios.post(`${apiUrl}/gallery/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Bild erfolgreich hochgeladen!");
      setUploadFile(null);
      setUploadTitle("");
      setUploadArtist("Maria");
      const fileInput = document.getElementById("galleryFileInput");
      if (fileInput) fileInput.value = "";
      loadData();
    } catch (error) {
      console.error(error);
      alert("Upload fehlgeschlagen: " + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  }

  async function deleteImage(id) {
    if (!confirm("Bild wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/gallery/${id}`);
      alert("Bild gelöscht!");
      loadData();
    } catch (error) {
      alert("Löschen fehlgeschlagen: " + (error.response?.data?.error || error.message));
    }
  }

  async function addFaq(e) {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/faqs`, newFaq);
      setNewFaq({ question: "", answer: "", category: "Allgemein" });
      alert("FAQ hinzugefügt!");
      loadData();
    } catch (error) {
      alert("Fehler: " + (error.response?.data?.error || error.message));
    }
  }

  async function deleteFaq(id) {
    if (!confirm("FAQ wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/faqs/${id}`);
      loadData();
    } catch (error) {
      alert("Löschen fehlgeschlagen");
    }
  }

  async function moveFaq(index, direction) {
    const newFaqs = [...faqs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;

    // Swap positions
    [newFaqs[index], newFaqs[targetIndex]] = [newFaqs[targetIndex], newFaqs[index]];

    // Update order field for both FAQs
    try {
      await axios.put(`${apiUrl}/faqs/${newFaqs[index]._id}`, {
        ...newFaqs[index],
        order: index,
      });
      await axios.put(`${apiUrl}/faqs/${newFaqs[targetIndex]._id}`, {
        ...newFaqs[targetIndex],
        order: targetIndex,
      });

      // Update local state immediately
      setFaqs(newFaqs);
    } catch (error) {
      alert("Fehler beim Verschieben: " + (error.response?.data?.error || error.message));
    }
  }

  async function addEvent(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("location", newEvent.location);
      formData.append("type", newEvent.type);

      if (eventFile) {
        formData.append("file", eventFile);
      }

      await axios.post(`${apiUrl}/events/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        type: "Sonstiges",
      });
      setEventFile(null);
      const eventInput = document.getElementById("eventFileInput");
      if (eventInput) eventInput.value = "";
      alert("Event hinzugefügt!");
      loadData();
    } catch (error) {
      alert("Fehler: " + (error.response?.data?.error || error.message));
    }
  }

  async function deleteEvent(id) {
    if (!confirm("Event wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/events/${id}`);
      loadData();
    } catch (error) {
      alert("Löschen fehlgeschlagen");
    }
  }

  async function addCertificate(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newCertificate.title);
      formData.append("description", newCertificate.description);
      formData.append("issuer", newCertificate.issuer);
      formData.append("date", newCertificate.date);
      formData.append("category", newCertificate.category);

      if (certificateFile) {
        formData.append("file", certificateFile);
      }

      await axios.post(`${apiUrl}/certificates/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewCertificate({
        title: "",
        description: "",
        issuer: "",
        date: "",
        category: "Hygiene",
      });
      setCertificateFile(null);
      const certInput = document.getElementById("certificateFileInput");
      if (certInput) certInput.value = "";
      alert("Zertifikat hinzugefügt!");
      loadData();
    } catch (error) {
      alert("Fehler: " + (error.response?.data?.error || error.message));
    }
  }

  async function deleteCertificate(id) {
    if (!confirm("Zertifikat wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/certificates/${id}`);
      loadData();
    } catch (error) {
      alert("Löschen fehlgeschlagen");
    }
  }

  async function addOffer(e) {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/offers`, newOffer);
      setNewOffer({
        title: "",
        description: "",
        price: "",
        validUntil: "",
        category: "Tattoo",
      });
      alert("Angebot hinzugefügt!");
      loadData();
    } catch (error) {
      alert("Fehler: " + (error.response?.data?.error || error.message));
    }
  }

  async function deleteOffer(id) {
    if (!confirm("Angebot wirklich löschen?")) return;
    try {
      await axios.delete(`${apiUrl}/offers/${id}`);
      loadData();
    } catch (error) {
      alert("Löschen fehlgeschlagen");
    }
  }

  // Drag & Drop Handlers für Gallery
  function handleGalleryDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(true);
  }

  function handleGalleryDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(false);
  }

  function handleGalleryDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setUploadFile(files[0]);
      } else {
        alert("Bitte nur Bilddateien hochladen");
      }
    }
  }

  // Drag & Drop Handlers für Events
  function handleEventDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingEvent(true);
  }

  function handleEventDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingEvent(false);
  }

  function handleEventDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingEvent(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setEventFile(files[0]);
      } else {
        alert("Bitte nur Bilddateien hochladen");
      }
    }
  }

  // Drag & Drop Handlers für Certificates
  function handleCertificateDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingCertificate(true);
  }

  function handleCertificateDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingCertificate(false);
  }

  function handleCertificateDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingCertificate(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      if (files[0].type.startsWith("image/")) {
        setCertificateFile(files[0]);
      } else {
        alert("Bitte nur Bilddateien hochladen");
      }
    }
  }

  return (
    <section
      style={{
        padding: "120px 20px 60px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1b1816 0%, #0d0c0a 100%)",
      }}
    >
      <div className="container" style={{ maxWidth: 1200 }}>
        <h1
          style={{
            marginBottom: 40,
            textAlign: "center",
            fontSize: 48,
            background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Admin Dashboard
        </h1>

        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 40,
            borderBottom: "2px solid #333",
            paddingBottom: 10,
            overflowX: "auto",
            flexWrap: "wrap",
          }}
        >
          {["gallery", "events", "certificates", "faq", "offers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 24px",
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)"
                    : "#1b1816",
                border: "1px solid " + (activeTab === tab ? "#d4af37" : "#333"),
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                color: activeTab === tab ? "#0d0c0a" : "#fff",
                transition: "all 0.3s ease",
                textTransform: "capitalize",
              }}
            >
              {tab === "gallery"
                ? "Galerie"
                : tab === "events"
                ? "Events"
                : tab === "certificates"
                ? "Zertifikate"
                : tab === "faq"
                ? "FAQ"
                : "Angebote"}
            </button>
          ))}
        </div>

        {/* GALLERY TAB */}
        {activeTab === "gallery" && (
          <div>
            <h2 style={{ marginBottom: 30, fontSize: 32, color: "#c8a05d" }}>
              Galerie verwalten
            </h2>
            <form
              onSubmit={handleUpload}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                marginBottom: 40,
                border: "1px solid #333",
              }}
            >
              <h3 style={{ marginBottom: 20, color: "#f4e5c2" }}>
                Neues Bild hochladen
              </h3>
              <div style={{ display: "grid", gap: 20 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#c8a05d",
                      fontWeight: 600,
                    }}
                  >
                    Bild auswählen *
                  </label>
                  <div
                    onDragOver={handleGalleryDragOver}
                    onDragLeave={handleGalleryDragLeave}
                    onDrop={handleGalleryDrop}
                    style={{
                      width: "100%",
                      padding: 40,
                      borderRadius: 8,
                      border: isDraggingGallery
                        ? "2px dashed #d4af37"
                        : "2px dashed #555",
                      background: isDraggingGallery ? "#1f1d1a" : "#0d0c0a",
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => document.getElementById("galleryFileInput").click()}
                  >
                    {uploadFile ? (
                      <div>
                        <p style={{ color: "#d4af37", fontWeight: 600, marginBottom: 8 }}>
                          ✓ {uploadFile.name}
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Klicken oder neue Datei hierher ziehen zum Ändern
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontSize: 24, marginBottom: 8 }}>📁</p>
                        <p style={{ color: "#c8a05d", fontWeight: 600, marginBottom: 4 }}>
                          Datei hierher ziehen oder klicken
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Unterstützte Formate: JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="galleryFileInput"
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    accept="image/*"
                    required
                    style={{ display: "none" }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#c8a05d",
                      fontWeight: 600,
                    }}
                  >
                    Titel
                  </label>
                  <input
                    placeholder="z.B. Tribal Oberarm"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid #555",
                      background: "#0d0c0a",
                      color: "#fff",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#c8a05d",
                      fontWeight: 600,
                    }}
                  >
                    Künstler *
                  </label>
                  <select
                    value={uploadArtist}
                    onChange={(e) => setUploadArtist(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 12,
                      borderRadius: 8,
                      border: "1px solid #555",
                      background: "#0d0c0a",
                      color: "#fff",
                    }}
                  >
                    <option value="Maria">Maria</option>
                    <option value="Robert">Robert</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn"
                  disabled={uploading}
                  style={{
                    padding: "15px 30px",
                    fontSize: 16,
                    background: uploading
                      ? "#666"
                      : "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: 8,
                    cursor: uploading ? "not-allowed" : "pointer",
                    fontWeight: 700,
                  }}
                >
                  {uploading ? "Wird hochgeladen..." : "Hochladen"}
                </button>
              </div>
            </form>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
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
                    border: "1px solid #333",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <img
                    src={img.url}
                    alt={img.title || "Galerie Bild"}
                    style={{ width: "100%", height: 250, objectFit: "cover" }}
                  />
                  <div style={{ padding: 15 }}>
                    <p style={{ fontWeight: 600, marginBottom: 5, color: "#f4e5c2" }}>
                      {img.title || "Ohne Titel"}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#c8a05d",
                        marginBottom: 10,
                      }}
                    >
                      Künstler: {img.artist}
                    </p>
                    <button
                      onClick={() => deleteImage(img._id)}
                      style={{
                        width: "100%",
                        padding: 10,
                        background: "#d32f2f",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 600,
                        transition: "background 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#b71c1c")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#d32f2f")}
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === "faq" && (
          <div>
            <h2 style={{ marginBottom: 30, fontSize: 32, color: "#c8a05d" }}>
              FAQ verwalten
            </h2>
            <form
              onSubmit={addFaq}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                marginBottom: 40,
                border: "1px solid #333",
              }}
            >
              <h3 style={{ marginBottom: 20, color: "#f4e5c2" }}>
                Neue FAQ hinzufügen
              </h3>
              <div style={{ display: "grid", gap: 20 }}>
                <input
                  placeholder="Frage"
                  value={newFaq.question}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, question: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
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
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    minHeight: 120,
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <select
                  value={newFaq.category}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, category: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                >
                  <option value="Allgemein">Allgemein</option>
                  <option value="Tattoo">Tattoo</option>
                  <option value="Piercing">Piercing</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Termin">Termin</option>
                </select>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    padding: "15px 30px",
                    fontSize: 16,
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Hinzufügen
                </button>
              </div>
            </form>

            <div style={{ display: "grid", gap: 20 }}>
              {faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  style={{
                    background: "#1b1816",
                    padding: 20,
                    borderRadius: 12,
                    border: "1px solid #333",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 15,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: "#c8a05d",
                        fontWeight: 600,
                        background: "#0d0c0a",
                        padding: "5px 12px",
                        borderRadius: 6,
                      }}
                    >
                      {faq.category}
                    </span>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      {/* Hoch/Runter Pfeile */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <button
                          onClick={() => moveFaq(index, "up")}
                          disabled={index === 0}
                          style={{
                            padding: "4px 8px",
                            background: index === 0 ? "#444" : "#c8a05d",
                            border: "none",
                            borderRadius: 4,
                            color: "#fff",
                            cursor: index === 0 ? "not-allowed" : "pointer",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                          title="Nach oben"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveFaq(index, "down")}
                          disabled={index === faqs.length - 1}
                          style={{
                            padding: "4px 8px",
                            background: index === faqs.length - 1 ? "#444" : "#c8a05d",
                            border: "none",
                            borderRadius: 4,
                            color: "#fff",
                            cursor: index === faqs.length - 1 ? "not-allowed" : "pointer",
                            fontSize: 14,
                            fontWeight: 600,
                          }}
                          title="Nach unten"
                        >
                          ▼
                        </button>
                      </div>
                      <button
                        onClick={() => deleteFaq(faq._id)}
                        style={{
                          padding: "8px 18px",
                          background: "#d32f2f",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Löschen
                      </button>
                    </div>
                  </div>
                  <h3 style={{ marginBottom: 12, color: "#f4e5c2" }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: "#ccc", lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div>
            <h2 style={{ marginBottom: 30, fontSize: 32, color: "#c8a05d" }}>
              Events verwalten
            </h2>
            <form
              onSubmit={addEvent}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                marginBottom: 40,
                border: "1px solid #333",
              }}
            >
              <h3 style={{ marginBottom: 20, color: "#f4e5c2" }}>
                Neues Event hinzufügen
              </h3>
              <div style={{ display: "grid", gap: 20 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#c8a05d",
                      fontWeight: 600,
                    }}
                  >
                    Bild / Flyer hochladen (optional)
                  </label>
                  <div
                    onDragOver={handleEventDragOver}
                    onDragLeave={handleEventDragLeave}
                    onDrop={handleEventDrop}
                    style={{
                      width: "100%",
                      padding: 40,
                      borderRadius: 8,
                      border: isDraggingEvent
                        ? "2px dashed #d4af37"
                        : "2px dashed #555",
                      background: isDraggingEvent ? "#1f1d1a" : "#0d0c0a",
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => document.getElementById("eventFileInput").click()}
                  >
                    {eventFile ? (
                      <div>
                        <p style={{ color: "#d4af37", fontWeight: 600, marginBottom: 8 }}>
                          ✓ {eventFile.name}
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Klicken oder neue Datei hierher ziehen zum Ändern
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontSize: 24, marginBottom: 8 }}>📁</p>
                        <p style={{ color: "#c8a05d", fontWeight: 600, marginBottom: 4 }}>
                          Datei hierher ziehen oder klicken
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Unterstützte Formate: JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="eventFileInput"
                    type="file"
                    onChange={(e) => setEventFile(e.target.files[0])}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <input
                  placeholder="Titel"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
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
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    minHeight: 100,
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
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
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                />
                <select
                  value={newEvent.type}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, type: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                >
                  <option value="Tattoo Convention">Tattoo Convention</option>
                  <option value="Guest Spot">Guest Spot</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Special Offer">Special Offer</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    padding: "15px 30px",
                    fontSize: 16,
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Hinzufügen
                </button>
              </div>
            </form>

            <div style={{ display: "grid", gap: 20 }}>
              {events.map((event) => (
                <div
                  key={event._id}
                  style={{
                    background: "#1b1816",
                    padding: 20,
                    borderRadius: 12,
                    border: "1px solid #333",
                    display: "grid",
                    gridTemplateColumns: event.imageUrl ? "200px 1fr" : "1fr",
                    gap: 20,
                  }}
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      style={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 15,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#c8a05d",
                            fontWeight: 600,
                            background: "#0d0c0a",
                            padding: "5px 12px",
                            borderRadius: 6,
                          }}
                        >
                          {event.type}
                        </span>
                        <p style={{ fontSize: 14, color: "#999", marginTop: 8 }}>
                          {new Date(event.date).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        style={{
                          padding: "8px 18px",
                          background: "#d32f2f",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                          cursor: "pointer",
                          fontWeight: 600,
                          height: "fit-content",
                        }}
                      >
                        Löschen
                      </button>
                    </div>
                    <h3 style={{ marginBottom: 12, color: "#f4e5c2" }}>
                      {event.title}
                    </h3>
                    <p style={{ color: "#ccc", marginBottom: 10, lineHeight: 1.6 }}>
                      {event.description}
                    </p>
                    {event.location && (
                      <p style={{ fontSize: 14, color: "#c8a05d" }}>
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATES TAB */}
        {activeTab === "certificates" && (
          <div>
            <h2 style={{ marginBottom: 30, fontSize: 32, color: "#c8a05d" }}>
              Zertifikate verwalten
            </h2>
            <form
              onSubmit={addCertificate}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                marginBottom: 40,
                border: "1px solid #333",
              }}
            >
              <h3 style={{ marginBottom: 20, color: "#f4e5c2" }}>
                Neues Zertifikat hinzufügen
              </h3>
              <div style={{ display: "grid", gap: 20 }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      color: "#c8a05d",
                      fontWeight: 600,
                    }}
                  >
                    Bild / Flyer hochladen (optional)
                  </label>
                  <div
                    onDragOver={handleCertificateDragOver}
                    onDragLeave={handleCertificateDragLeave}
                    onDrop={handleCertificateDrop}
                    style={{
                      width: "100%",
                      padding: 40,
                      borderRadius: 8,
                      border: isDraggingCertificate
                        ? "2px dashed #d4af37"
                        : "2px dashed #555",
                      background: isDraggingCertificate ? "#1f1d1a" : "#0d0c0a",
                      color: "#fff",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => document.getElementById("certificateFileInput").click()}
                  >
                    {certificateFile ? (
                      <div>
                        <p style={{ color: "#d4af37", fontWeight: 600, marginBottom: 8 }}>
                          ✓ {certificateFile.name}
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Klicken oder neue Datei hierher ziehen zum Ändern
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ fontSize: 24, marginBottom: 8 }}>📁</p>
                        <p style={{ color: "#c8a05d", fontWeight: 600, marginBottom: 4 }}>
                          Datei hierher ziehen oder klicken
                        </p>
                        <p style={{ fontSize: 14, color: "#999" }}>
                          Unterstützte Formate: JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    id="certificateFileInput"
                    type="file"
                    onChange={(e) => setCertificateFile(e.target.files[0])}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
                <input
                  placeholder="Titel"
                  value={newCertificate.title}
                  onChange={(e) =>
                    setNewCertificate({ ...newCertificate, title: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <textarea
                  placeholder="Beschreibung"
                  value={newCertificate.description}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      description: e.target.value,
                    })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    minHeight: 100,
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                />
                <input
                  placeholder="Aussteller"
                  value={newCertificate.issuer}
                  onChange={(e) =>
                    setNewCertificate({ ...newCertificate, issuer: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <input
                  type="date"
                  value={newCertificate.date}
                  onChange={(e) =>
                    setNewCertificate({ ...newCertificate, date: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <select
                  value={newCertificate.category}
                  onChange={(e) =>
                    setNewCertificate({
                      ...newCertificate,
                      category: e.target.value,
                    })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                >
                  <option value="Hygiene">Hygiene</option>
                  <option value="Ausbildung">Ausbildung</option>
                  <option value="Qualifikation">Qualifikation</option>
                  <option value="Convention Preise">Convention Preise</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    padding: "15px 30px",
                    fontSize: 16,
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Hinzufügen
                </button>
              </div>
            </form>

            <div style={{ display: "grid", gap: 20 }}>
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  style={{
                    background: "#1b1816",
                    padding: 20,
                    borderRadius: 12,
                    border: "1px solid #333",
                    display: "grid",
                    gridTemplateColumns: cert.imageUrl ? "200px 1fr" : "1fr",
                    gap: 20,
                  }}
                >
                  {cert.imageUrl && (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      style={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 15,
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#c8a05d",
                            fontWeight: 600,
                            background: "#0d0c0a",
                            padding: "5px 12px",
                            borderRadius: 6,
                          }}
                        >
                          {cert.category}
                        </span>
                        <p style={{ fontSize: 14, color: "#999", marginTop: 8 }}>
                          {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("de-DE") : "Kein Datum"}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteCertificate(cert._id)}
                        style={{
                          padding: "8px 18px",
                          background: "#d32f2f",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Löschen
                      </button>
                    </div>
                    <h3 style={{ marginBottom: 8, color: "#f4e5c2" }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "#c8a05d", marginBottom: 10 }}>
                      Aussteller: {cert.issuer}
                    </p>
                    <p style={{ color: "#ccc", lineHeight: 1.6 }}>
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS TAB */}
        {activeTab === "offers" && (
          <div>
            <h2 style={{ marginBottom: 30, fontSize: 32, color: "#c8a05d" }}>
              Angebote verwalten
            </h2>
            <form
              onSubmit={addOffer}
              style={{
                background: "#1b1816",
                padding: 30,
                borderRadius: 12,
                marginBottom: 40,
                border: "1px solid #333",
              }}
            >
              <h3 style={{ marginBottom: 20, color: "#f4e5c2" }}>
                Neues Angebot hinzufügen
              </h3>
              <div style={{ display: "grid", gap: 20 }}>
                <input
                  placeholder="Titel"
                  value={newOffer.title}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, title: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <textarea
                  placeholder="Beschreibung"
                  value={newOffer.description}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, description: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    minHeight: 100,
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                />
                <input
                  placeholder="Preis (z.B. 150€)"
                  value={newOffer.price}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, price: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                  required
                />
                <input
                  type="date"
                  placeholder="Gültig bis"
                  value={newOffer.validUntil}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, validUntil: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                />
                <select
                  value={newOffer.category}
                  onChange={(e) =>
                    setNewOffer({ ...newOffer, category: e.target.value })
                  }
                  style={{
                    padding: 12,
                    borderRadius: 8,
                    border: "1px solid #555",
                    background: "#0d0c0a",
                    color: "#fff",
                  }}
                >
                  <option value="Tattoo">Tattoo</option>
                  <option value="Piercing">Piercing</option>
                  <option value="Pflegeprodukte">Pflegeprodukte</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
                <button
                  type="submit"
                  className="btn"
                  style={{
                    padding: "15px 30px",
                    fontSize: 16,
                    background: "linear-gradient(135deg, #f4e5c2 0%, #d4af37 50%, #f4e5c2 100%)",
                    color: "#0d0c0a",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Hinzufügen
                </button>
              </div>
            </form>

            <div style={{ display: "grid", gap: 20 }}>
              {offers.map((offer) => (
                <div
                  key={offer._id}
                  style={{
                    background: "#1b1816",
                    padding: 20,
                    borderRadius: 12,
                    border: "1px solid #333",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 15,
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#c8a05d",
                          fontWeight: 600,
                          background: "#0d0c0a",
                          padding: "5px 12px",
                          borderRadius: 6,
                        }}
                      >
                        {offer.category}
                      </span>
                      {offer.validUntil && (
                        <p style={{ fontSize: 14, color: "#999", marginTop: 8 }}>
                          Gültig bis:{" "}
                          {new Date(offer.validUntil).toLocaleDateString("de-DE")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteOffer(offer._id)}
                      style={{
                        padding: "8px 18px",
                        background: "#d32f2f",
                        border: "none",
                        borderRadius: 8,
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      Löschen
                    </button>
                  </div>
                  <h3 style={{ marginBottom: 8, color: "#f4e5c2" }}>
                    {offer.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 20,
                      color: "#c8a05d",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    {offer.price}
                  </p>
                  <p style={{ color: "#ccc", lineHeight: 1.6 }}>
                    {offer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
