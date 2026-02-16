const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token)
    return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

/** Optional auth: sets req.user and req.userId when token is valid, otherwise continues without them */
function optionalAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  if (!token) return next();

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.user = decoded;
    req.userId = decoded.userId;
  } catch (err) {
    // ignore invalid token
  }
  next();
}

module.exports = { checkAuth, optionalAuth };
