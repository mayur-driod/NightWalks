const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to mongoDB Atlas");
  } catch (err) {
    console.log(err, "There was an error connecting to atlas");
  }
};

module.exports = connectDB;
