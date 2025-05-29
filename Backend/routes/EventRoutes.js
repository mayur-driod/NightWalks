const express = require("express");
const {
  createEvent,
  getEvents,
  delEvent,
} = require("../controllers/EventsControl");
const Eventrouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Set the destination for uploaded files

Eventrouter.post("/Create", upload.single("image"), createEvent);

Eventrouter.get("/Fetch", getEvents);

Eventrouter.delete("/Delete/:id", delEvent);

module.exports = Eventrouter;
