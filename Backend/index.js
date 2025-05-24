const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const router = require("./routes/orderRoutes");
const accessrouter = require("./routes/AccessRoutes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const url = process.env.MONGO_URI;

const allowedOrigins = [
  "https://product-page-git-main-mayurs-projects-8fbc2ff1.vercel.app", // vercel
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

app.use("/api", router);
app.use("/access", accessrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(url);
  console.log(`Server running on port ${PORT}`);
});
