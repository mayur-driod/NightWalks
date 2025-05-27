const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const CloudinaryUpload = require("../utils/upload");
const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const { name, date, time, price } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !date || !time || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const photoURLs = await CloudinaryUpload(req.file, "TerraQuest/Sightings");

    if (!photoURLs || photoURLs.length === 0) {
      return res.status(500).json({ message: "Cloudinary upload failed..." });
    }

    const newEvent = await Event.create({
      name,
      date,
      time,
      price,
      image: photoURLs[0],
    });

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create event", error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
};

const delEvent = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ Msg: "ID is a required field!" });
  }

  try {
    const result = await Event.findByIdAndDelete(id);
    res.status(204).json({ Msg: "Successfully delted event", res: result });
  } catch (err) {
    res.status(500).json({ error: err, msg: "There was an internal error" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  delEvent,
};
