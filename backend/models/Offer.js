const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: String,
  category: {
    type: String,
    enum: ["Tattoo", "Piercing", "Cover-up", "Beratung", "Sonstiges"],
    default: "Tattoo",
  },
  imageUrl: String,
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Offer", OfferSchema);
