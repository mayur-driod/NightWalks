const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/orderRoutes");
const accessrouter = require("./routes/AccessRoutes");
const cookieParser = require("cookie-parser");
const Eventrouter = require("./routes/EventRoutes");

require("dotenv").config();

const app = express();
const url = process.env.MONGO_URI;

const allowedOrigins = [
  "https://attacus-and-psyche.vercel.app", // vercel
  "http://localhost:3000",
  "http://localhost:5173", //local
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // if you're using cookies or auth headers
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  console.log("Pinged at", new Date().toISOString());
  res.status(200).json({ message: "Server is healthy" });
}); // this is used for keeping the server alive

app.use("/api", router);
app.use("/access", accessrouter);
app.use("/Events", Eventrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(url);
  console.log(`Server running on port ${PORT}`);
});
