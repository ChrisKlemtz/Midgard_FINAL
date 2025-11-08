const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");

// GET /api/offers - Alle aktiven Angebote
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find({ active: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/offers/:id - Einzelnes Angebot
router.get("/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer)
      return res.status(404).json({ message: "Angebot nicht gefunden" });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
