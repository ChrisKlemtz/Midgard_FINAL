const express = require("express");
const router = express.Router();
const Image = require("../models/Image");
const upload = require("../middleware/upload");

// GET /api/gallery
router.get("/", async (req,res) => {
  const imgs = await Image.find().sort({ createdAt: -1 }).limit(200);
  res.json(imgs);
});

// POST /api/gallery/upload  (Admin-only; hier ohne Auth zum Start erweitern)
router.post("/upload", upload.single("file"), async (req,res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Datei fehlt" });
    const url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    const img = new Image({ title: req.body.title || "", url, artist: req.body.artist || "Andere", tags: req.body.tags ? req.body.tags.split(",") : [] });
    await img.save();
    res.json(img);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
