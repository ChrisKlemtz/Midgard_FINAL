const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

// GET /api/certificates - Alle aktiven Zertifikate
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find({ active: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/certificates/:id - Einzelnes Zertifikat
router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).json({ message: "Zertifikat nicht gefunden" });
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/certificates/upload - Zertifikat mit Bild hochladen
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let imageUrl = null;
    let cloudinaryId = null;

    // Wenn ein Bild hochgeladen wurde, zu Cloudinary hochladen
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "midgard/certificates",
        resource_type: "auto"
      });
      imageUrl = result.secure_url;
      cloudinaryId = result.public_id;
    }

    // Zertifikat erstellen
    const certificate = new Certificate({
      title: req.body.title,
      description: req.body.description,
      issuer: req.body.issuer,
      issueDate: req.body.date,
      category: req.body.category,
      imageUrl: imageUrl,
      cloudinaryId: cloudinaryId
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/certificates - Neues Zertifikat erstellen (ohne Bild)
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl, issuer, date, order, active, category } = req.body;
    const certificate = new Certificate({
      title,
      description,
      imageUrl,
      issuer,
      issueDate: date,
      order,
      active,
      category
    });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/certificates/:id - Zertifikat aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const { title, description, imageUrl, issuer, date, order, active } = req.body;
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, issuer, date, order, active },
      { new: true, runValidators: true }
    );
    if (!certificate)
      return res.status(404).json({ message: "Zertifikat nicht gefunden" });
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/certificates/:id - Zertifikat löschen
router.delete("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate)
      return res.status(404).json({ message: "Zertifikat nicht gefunden" });

    // Lösche Bild von Cloudinary, falls vorhanden
    if (certificate.cloudinaryId) {
      await cloudinary.uploader.destroy(certificate.cloudinaryId);
    }

    // Lösche Zertifikat aus MongoDB
    await Certificate.findByIdAndDelete(req.params.id);

    res.json({ message: "Zertifikat gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
