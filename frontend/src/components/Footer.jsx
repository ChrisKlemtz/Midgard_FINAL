import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Midgard Tattoo Studio — nordisch. echt. hochwertig.</p>
        <p>
          <Link to="/impressum">Impressum</Link> · <Link to="/certificates">Zertifikate</Link>
        </p>
        <small>© {new Date().getFullYear()} Midgard Tattoo</small>
      </div>
    </footer>
  );
}
