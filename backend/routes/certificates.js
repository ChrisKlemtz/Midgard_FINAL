const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

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

// POST /api/certificates - Neues Zertifikat erstellen
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl, issuer, date, order, active } = req.body;
    const certificate = new Certificate({ title, description, imageUrl, issuer, date, order, active });
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
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate)
      return res.status(404).json({ message: "Zertifikat nicht gefunden" });
    res.json({ message: "Zertifikat gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
