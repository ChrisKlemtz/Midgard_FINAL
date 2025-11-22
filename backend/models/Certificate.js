const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  issuer: String,
  issueDate: Date,
  imageUrl: String,
  cloudinaryId: String,
  category: {
    type: String,
    enum: ["Hygiene", "Ausbildung", "Qualifikation", "Convention Preise", "Sonstiges"],
    default: "Hygiene",
  },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Certificate", CertificateSchema);
