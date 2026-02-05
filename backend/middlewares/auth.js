const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded; // Store user info in req.user
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { checkAuth };
