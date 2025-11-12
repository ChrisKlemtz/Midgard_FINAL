import React, { useState, useEffect } from "react";
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
import "./styles/theme.css";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  // Scroll nach oben bei jedem Seitenwechsel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    </div>
  );
}
