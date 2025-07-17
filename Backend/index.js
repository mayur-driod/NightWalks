const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./db");
const router = require("./routes/orderRoutes");
const accessrouter = require("./routes/AccessRoutes");
const cookieParser = require("cookie-parser");
const Eventrouter = require("./routes/EventRoutes");

require("dotenv").config();

const uptimeAPI = process.env.UPTIME_ROBOT_API_KEY || "";

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

app.get("/health", async (req, res) => {
  console.log("Pinged at", new Date().toISOString());
  try {
    const response = await axios.post(
      "https://api.uptimerobot.com/v2/getMonitors",
      {
        api_key: uptimeAPI,
        format: "json",
      },
    );

    const monitors = response.data.monitors.map((monitor) => ({
      name: monitor.friendly_name,
      status: monitor.status, // 2 = Up, 9 = Down, 0 = Paused
      uptime: monitor.all_time_uptime_ratio || "N/A",
      type: getMonitorType(monitor.type), // e.g., "HTTP(s)"
      interval: `${monitor.interval / 60} min`,
      createdAt: formatUnixDate(monitor.create_datetime),
      responseTime: monitor.last_response_time
        ? `${monitor.last_response_time} ms`
        : "N/A",
    }));

    res.json({ monitors });
  } catch (err) {
    console.error("UptimeRobot Error:", err.message);
    res.status(500).json({ error: "Failed to fetch uptime status" });
  }

  // Helper to map monitor type codes to labels
  function getMonitorType(type) {
    const typeMap = {
      1: "HTTP(s)",
      2: "Keyword",
      3: "Ping",
      4: "Port",
      5: "Heartbeat",
    };
    return typeMap[type] || "Unknown";
  }

  // Helper to convert UNIX timestamp to readable date
  function formatUnixDate(unixTime) {
    return new Date(unixTime * 1000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
}); // this is used for keeping the server alive

app.use("/api", router);
app.use("/access", accessrouter);
app.use("/Events", Eventrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB(url);
  console.log(`Server running on port ${PORT}`);
});
