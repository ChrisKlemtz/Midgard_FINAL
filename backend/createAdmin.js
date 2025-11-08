// createAdmin.js (nur einmal ausführen)
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

(async ()=> {
  await mongoose.connect(process.env.MONGODB_URI);
  const pwHash = await bcrypt.hash("deinSicheresPasswort", 12);
  const a = new Admin({ username: "admin", passwordHash: pwHash });
  await a.save();
  console.log("Admin created");
  process.exit(0);
})();
