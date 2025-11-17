const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: String,
  url: String,
  cloudinaryId: String, // für Cloudinary delete
  artist: { type: String, enum: ["Maria", "Robert", "Andere"], default: "Andere" },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", ImageSchema);
