const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// Falls .env nicht existiert, versuche die URI aus der Umgebung zu lesen
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/midgard";

console.log("Verbinde mit MongoDB...");
// Verbinde mit der Datenbank
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Certificate = require("../models/Certificate");

async function addConventionPreise() {
  try {
    // Erstelle Convention Preise Zertifikat
    const conventionPreise = new Certificate({
      title: "Convention Preise",
      description: "Unsere speziellen Preise für Tattoo-Conventions und Events. Nutze die Gelegenheit und lass dir dein Tattoo zu vergünstigten Convention-Konditionen stechen.",
      category: "Convention Preise",
      active: true,
      order: 4,
    });

    await conventionPreise.save();
    console.log("✅ Convention Preise Zertifikat erfolgreich erstellt!");
    console.log(conventionPreise);

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Fehler beim Erstellen des Zertifikats:", error);
    mongoose.connection.close();
  }
}

addConventionPreise();
