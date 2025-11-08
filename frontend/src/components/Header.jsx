import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Schließe Mobile-Menü bei Route-Wechsel
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Verhindere Body-Scroll wenn Mobile-Menü offen ist
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    onOpenContact();
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/">Midgard Tattoo</Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <Link to="/" style={{ marginRight: 16 }}>
          Home
        </Link>
        <Link to="/galerie" style={{ marginRight: 16 }}>
          Galerie
        </Link>
        <Link to="/about" style={{ marginRight: 16 }}>
          About
        </Link>
        <Link to="/events" style={{ marginRight: 16 }}>
          Events
        </Link>
        <Link to="/certificates" style={{ marginRight: 16 }}>
          Hygiene
        </Link>
        <button className="btn" onClick={onOpenContact}>
          Kontakt
        </button>
      </nav>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/galerie">Galerie</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/certificates">Hygiene</Link>
        <button className="btn" onClick={handleContactClick}>
          Kontakt
        </button>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
