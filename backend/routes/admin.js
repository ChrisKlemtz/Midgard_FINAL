const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const Image = require("../models/Image");
const FAQ = require("../models/FAQ");
const Event = require("../models/Event");
const Offer = require("../models/Offer");
const Certificate = require("../models/Certificate");

// ============ GALLERY MANAGEMENT ============
router.get("/galleries", auth, async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/galleries", auth, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Datei fehlt" });

    const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    const img = new Image({
      title: req.body.title || "",
      url,
      artist: req.body.artist || "Andere",
      tags: req.body.tags ? req.body.tags.split(",").map((t) => t.trim()) : [],
    });
    await img.save();
    res.json(img);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/galleries/:id", auth, async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Bild gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ FAQ MANAGEMENT ============
router.get("/faqs", auth, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/faqs", auth, async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/faqs/:id", auth, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/faqs/:id", auth, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ EVENT MANAGEMENT ============
router.get("/events", auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/events", auth, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/events/:id", auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/events/:id", auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ OFFER MANAGEMENT ============
router.get("/offers", auth, async (req, res) => {
  try {
    const offers = await Offer.find().sort({ order: 1, createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/offers", auth, async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/offers/:id", auth, async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/offers/:id", auth, async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Angebot gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============ CERTIFICATE MANAGEMENT ============
router.get("/certificates", auth, async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({
      order: 1,
      createdAt: -1,
    });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/certificates", auth, async (req, res) => {
  try {
    const certificate = new Certificate(req.body);
    await certificate.save();
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/certificates/:id", auth, async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/certificates/:id", auth, async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Zertifikat gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
