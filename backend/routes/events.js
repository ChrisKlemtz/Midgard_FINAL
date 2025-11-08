const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

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

module.exports = router;
