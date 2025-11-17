const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const Tag = require("../models/Tag");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// GET /api/gallery
router.get("/", async (req,res) => {
  const imgs = await Image.find().sort({ createdAt: -1 }).limit(200);
  res.json(imgs);
});

// GET /api/gallery/tags - Alle verfügbaren Tags abrufen (MUSS VOR /:id kommen!)
router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/gallery/tags - Neuen Tag erstellen
router.post("/tags", async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) return res.status(400).json({ message: "Tag-Name fehlt" });

    const tag = new Tag({ name: name.trim(), color: color || "#c8a05d" });
    await tag.save();
    res.json(tag);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "Tag existiert bereits" });
    }
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/gallery/tags/:id - Tag löschen
router.delete("/tags/:id", async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ message: "Tag gelöscht" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/gallery/upload  (Admin-only; hier ohne Auth zum Start erweitern)
router.post("/upload", upload.single("file"), async (req,res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Datei fehlt" });

    // Upload zu Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "midgard/gallery",
      resource_type: "auto"
    });

    // Speichere in MongoDB
    const img = new Image({
      title: req.body.title || "",
      url: result.secure_url,
      cloudinaryId: result.public_id,
      artist: req.body.artist || "Andere",
      tags: req.body.tags ? req.body.tags.split(",") : []
    });
    await img.save();

    res.json(img);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/gallery/:id
router.delete("/:id", async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) return res.status(404).json({ message: "Bild nicht gefunden" });

    // Lösche von Cloudinary
    if (img.cloudinaryId) {
      await cloudinary.uploader.destroy(img.cloudinaryId);
    }

    // Lösche aus MongoDB
    await Image.findByIdAndDelete(req.params.id);

    res.json({ message: "Bild erfolgreich gelöscht" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
