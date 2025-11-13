import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/midgard_logo_main.svg";

export default function Header({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Midgard Tattoo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/galerie"
          className={`nav-link ${location.pathname === "/galerie" ? "active" : ""}`}
        >
          Galerie
        </Link>
        <Link
          to="/about"
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>
        <Link
          to="/events"
          className={`nav-link ${location.pathname === "/events" ? "active" : ""}`}
        >
          Events
        </Link>
        <Link
          to="/certificates"
          className={`nav-link ${location.pathname === "/certificates" ? "active" : ""}`}
        >
          Zertifikate
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
        <Link to="/certificates">Zertifikate</Link>
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
