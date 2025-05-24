const express = require("express");
const {
  createAccess,
  Proceed,
  logout,
} = require("../controllers/AccessController");
const { verifyToken } = require("../Middleware/JWTAuth");
const accessrouter = express.Router();

accessrouter.post("/signup", createAccess);
accessrouter.post("/login", Proceed);

accessrouter.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ Msg: "You are authenticated!" });
});

accessrouter.post("/logout", logout);

module.exports = accessrouter;
