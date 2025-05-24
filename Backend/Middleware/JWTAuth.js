const jwt = require("jsonwebtoken");

// Middleware to verify JWT from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.dev_access_token;
  console.log(token);

  if (!token) {
    return res.status(403).json({ Msg: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Allow the request to proceed
  } catch (err) {
    res.status(400).json({ Msg: "Invalid or expired token." });
  }
};

module.exports = { verifyToken };
