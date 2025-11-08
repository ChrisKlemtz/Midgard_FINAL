const express = require("express");
const router = express.Router();
const FAQ = require("../models/FAQ");

// GET /api/faqs - Alle FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/faqs/:id - Einzelne FAQ
router.get("/:id", async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ nicht gefunden" });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
