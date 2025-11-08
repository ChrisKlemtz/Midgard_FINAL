import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/">Midgard Tattoo</Link>
      </div>

      <nav>
        <Link to="/" style={{ marginRight: 16 }}>Home</Link>
        <Link to="/galerie" style={{ marginRight: 16 }}>Galerie</Link>
        <Link to="/about" style={{ marginRight: 16 }}>About</Link>
        <Link to="/events" style={{ marginRight: 16 }}>Events</Link>
        <Link to="/certificates" style={{ marginRight: 16 }}>Hygiene</Link>
        <button className="btn" onClick={onOpenContact}>Kontakt</button>
      </nav>
    </header>
  );
}
