const mongoose = require("mongoose");

const DevAccess = new mongoose.Schema({
  User: { type: String, required: true },
  Password: { type: String, required: true },
});

module.exports = mongoose.model("DevAcess", DevAccess);
