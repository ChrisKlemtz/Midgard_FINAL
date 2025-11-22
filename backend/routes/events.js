const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// GET /api/events - Alle aktiven Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ active: true }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/events/:id - Einzelnes Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event nicht gefunden" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/events/upload - Event mit Bild hochladen
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let imageUrl = null;
    let cloudinaryId = null;

    // Wenn ein Bild hochgeladen wurde, zu Cloudinary hochladen
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "midgard/events",
        resource_type: "auto"
      });
      imageUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    // Event erstellen
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      type: req.body.type,
      imageUrl: imageUrl,
      cloudinaryId: cloudinaryId
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/events - Neues Event erstellen (ohne Bild)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, type, active, imageUrl } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      type,
      active,
      imageUrl
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/events/:id - Event aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, location, active } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location, active },
      { new: true, runValidators: true }
    );
    if (!event)
      return res.status(404).json({ message: "Event nicht gefunden" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/events/:id - Event löschen
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event nicht gefunden" });

    // Lösche Bild von Cloudinary, falls vorhanden
    if (event.cloudinaryId) {
      await cloudinary.uploader.destroy(event.cloudinaryId);
    }

    // Lösche Event aus MongoDB
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
