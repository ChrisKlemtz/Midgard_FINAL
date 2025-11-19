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

// POST /api/offers - Neues Angebot erstellen
router.post("/", async (req, res) => {
  try {
    const { title, description, price, features, order, active } = req.body;
    const offer = new Offer({ title, description, price, features, order, active });
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/offers/:id - Angebot aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const { title, description, price, features, order, active } = req.body;
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { title, description, price, features, order, active },
      { new: true, runValidators: true }
    );
    if (!offer)
      return res.status(404).json({ message: "Angebot nicht gefunden" });
    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/offers/:id - Angebot löschen
router.delete("/:id", async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer)
      return res.status(404).json({ message: "Angebot nicht gefunden" });
    res.json({ message: "Angebot gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
