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

// POST /api/events - Neues Event erstellen
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, active } = req.body;
    const event = new Event({ title, description, date, location, active });
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
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Event nicht gefunden" });
    res.json({ message: "Event gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
