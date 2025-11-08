import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("Alle");

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/gallery");
        setImages(res.data);
      } catch (e) {
        console.error("Galerie laden:", e);
      }
    }
    fetchImages();
  }, []);

  const filtered = images.filter(img => filter === "Alle" ? true : img.artist === filter);

  return (
    <section className="container">
      <div style={{display:"flex", gap:12, marginBottom:16}}>
        <button onClick={() => setFilter("Alle")} className="btn">Alle</button>
        <button onClick={() => setFilter("Maria")} className="btn">Maria</button>
        <button onClick={() => setFilter("Robert")} className="btn">Robert</button>
      </div>

      <div className="gallery-grid">
        {filtered.map(img => (
          <div key={img._id} className="card">
            <img src={img.url} alt={img.title || "Tattoo"} style={{width:"100%", display:"block"}} />
            <div style={{padding:12}}>
              <strong>{img.title}</strong>
              <div style={{fontSize:12, color:"#cfc6b0"}}>{img.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
