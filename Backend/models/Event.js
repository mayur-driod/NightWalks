const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true }, //stores the image URL not the actual file
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
