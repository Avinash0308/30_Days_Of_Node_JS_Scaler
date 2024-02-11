const jwt = require("jsonwebtoken");
const tokenn = process.env.SECRET_KEY;
function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verified = verifyToken(token);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
function verifyToken(token) {
  const decoded = jwt.verify(token, tokenn);
}
module.exports = authenticationMiddleware;
