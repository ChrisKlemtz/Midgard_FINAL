const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Vorerst KEIN Auth - später implementieren
  // Für jetzt einfach durchlassen
  next();

  /*
  // Später aktivieren:
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Kein Token, Zugriff verweigert" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token ungültig" });
  }
  */
};
