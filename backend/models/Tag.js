const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, unique: true, required: true },
  color: { type: String, default: "#c8a05d" }, // optional: Farbe für jeden Tag
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tag", TagSchema);
