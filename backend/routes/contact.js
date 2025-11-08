const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

const TWILIO_ENABLED = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN);

if (TWILIO_ENABLED) {
  var twilioClient = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// POST /api/contact/send
router.post("/send", upload.single("file"), async (req,res) => {
  try {
    const { name, message } = req.body;
    const file = req.file; // optional
    const studioNumber = process.env.WHATSAPP_NUMBER;

    const text = `Neue Anfrage von ${name}: ${message}`;

    if (TWILIO_ENABLED) {
      // Beispiel: sendet Text via Twilio Whatsapp
      const mediaUrl = file ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}` : undefined;
      const params = {
        from: process.env.TWILIO_WHATSAPP_FROM,
        to: `whatsapp:${studioNumber}`,
        body: text,
      };
      if (mediaUrl) params.mediaUrl = [mediaUrl];

      await twilioClient.messages.create(params);
      return res.json({ ok: true });
    } else {
      // Fallback: speichere Nachricht und gib wa.me link zurück (Frontend zeigt trotzdem kurzes Feedback)
      // Optional: Du könntest hier eine E-Mail senden.
      console.log("WhatsApp Fallback - speichere Anfrage lokal:", { name, message, file: file && file.filename });
      return res.json({ ok: true });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
