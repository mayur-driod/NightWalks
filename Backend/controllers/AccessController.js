const DevAccess = require("../models/DevAccess");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAccess = async (req, res) => {
  const { User, Password } = req.body;
  if (!User || !Password) {
    return res.status(400).json({ Msg: "All the fields are required!" });
  }

  try {
    const existingUser = await DevAccess.findOne({ User });

    if (existingUser) {
      return res.status(404).json({ Msg: "The user already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(Password, salt);

    const success = await DevAccess.create({
      User,
      Password: hashedPass,
    });

    res.status(201).json({ Msg: "User created successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ Error: err.message, Msg: "There was an internal server error" });
  }
};

const Proceed = async (req, res) => {
  const { User, Password } = req.body;
  if (!User || !Password) {
    return res.status(400).json({ Msg: "All the fields are required!" });
  }
  try {
    const user = await DevAccess.findOne({ User });

    if (!user) {
      return res.status(404).json({ Msg: "The user does not exist!" });
    }
    const success = await bcrypt.compare(Password, user.Password);

    if (!success) {
      return res.status(400).json({ Msg: "Wrong Password!" });
    }

    const token = jwt.sign(
      { user: user.User }, // Payload
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: "1h" }, // Token expiration time
    );

    // Set JWT token in a secure, httpOnly cookie
    res.cookie("dev_access_token", token, {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict", // Prevent cross-site request forgery
      maxAge: 60 * 60 * 1000, // 2 days expiration
    });

    res.status(201).json({ Msg: "Password matched, access granted!" });
  } catch (err) {
    res
      .status(500)
      .json({ Error: err.message, Msg: "There was an internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("dev_access_token");
  res.status(200).json({ Msg: "Logged out successfully" });
};

module.exports = { createAccess, Proceed, logout };
