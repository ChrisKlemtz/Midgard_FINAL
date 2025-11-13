import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GaleriePage from "./pages/GaleriePage";
import About from "./pages/About";
import EventsPage from "./pages/EventsPage";
import Certificates from "./pages/Certificates";
import Impressum from "./pages/Impressum";
import ContactModal from "./components/ContactModal";
import CookieBanner from "./components/CookieBanner";
import AdminDashboard from "./components/AdminDashboard";
import BackToTop from "./components/BackToTop";
import "./styles/theme.css";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  // Scroll-Restoration auf manuell setzen - SOFORT beim Mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // ULTRA-AGGRESSIVE Scroll-Lösung
  useLayoutEffect(() => {
    // Sofortiges Scrollen ALLER möglichen Scroll-Container
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      window.scroll(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.querySelector('html').scrollTop = 0;

      // Alle möglichen scrollbaren Elemente
      const scrollableElements = document.querySelectorAll('*');
      scrollableElements.forEach(el => {
        if (el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      });
    };

    // Sofort ausführen
    scrollToTop();
  }, [location.pathname, location.key]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      window.scroll(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.querySelector('html').scrollTop = 0;
    };

    // Nach Rendering
    scrollToTop();

    // Im nächsten Frame
    requestAnimationFrame(() => {
      scrollToTop();
    });

    // Nach kurzer Verzögerung
    const timer1 = setTimeout(scrollToTop, 0);
    const timer2 = setTimeout(scrollToTop, 10);
    const timer3 = setTimeout(scrollToTop, 50);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname, location.key]);

  return (
    <div className="app">
      <Header onOpenContact={() => setContactOpen(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galerie" element={<GaleriePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <CookieBanner />
      <BackToTop />
    </div>
  );
}
