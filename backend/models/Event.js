const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  imageUrl: String,
  cloudinaryId: String,
  type: {
    type: String,
    enum: [
      "Tattoo Convention",
      "Guest Spot",
      "Workshop",
      "Special Offer",
      "Sonstiges",
    ],
    default: "Sonstiges",
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
