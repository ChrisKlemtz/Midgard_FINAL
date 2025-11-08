require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/auth");
const galleryRoutes = require("./routes/gallery");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const eventsRoutes = require("./routes/events");
const certificatesRoutes = require("./routes/certificates");
const faqsRoutes = require("./routes/faqs");
const offersRoutes = require("./routes/offers");

const app = express();
app.use(cors());
app.use(express.json());

// statische Datei-Serves (z.B. falls Uploads in /uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/certificates", certificatesRoutes);
app.use("/api/faqs", faqsRoutes);
app.use("/api/offers", offersRoutes);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log("Server läuft auf", port));
  })
  .catch((err) => {
    console.error("MongoDB-Verbindungsfehler:", err);
    process.exit(1);
  });
