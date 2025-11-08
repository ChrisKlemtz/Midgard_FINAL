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

module.exports = router;
