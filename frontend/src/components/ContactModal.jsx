import React, { useState } from "react";
import axios from "axios";

export default function ContactModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
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
    <div style={{
      position: "fixed", inset:0, background:"rgba(0,0,0,0.6)",
      display:"flex", justifyContent:"center", alignItems:"center", zIndex:200
    }}>
      <form onSubmit={handleSubmit} style={{background:"#151210", padding:20, borderRadius:12, width: "min(600px, 95%)"}}>
        <h3>Kontakt / Termin anfragen</h3>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required/>
        <label>Nachricht</label>
        <textarea value={message} onChange={e=>setMessage(e.target.value)} required />
        <label>Referenzbild (optional)</label>
        <input type="file" onChange={e=>setFile(e.target.files[0])} accept="image/*"/>
        <div style={{display:"flex", gap:8, marginTop:12}}>
          <button type="submit" className="btn" disabled={loading}>{loading ? "Senden..." : "Senden"}</button>
          <button type="button" onClick={onClose}>Abbrechen</button>
        </div>
      </form>
    </div>
  );
}
