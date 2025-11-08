const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: {
    type: String,
    enum: ["Allgemein", "Tattoo", "Piercing", "Hygiene", "Termin"],
    default: "Allgemein",
  },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FAQ", FAQSchema);
