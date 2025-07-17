import React, { useEffect, useState } from "react";
import stars from "../assets/stars-1654074.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  PauseCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
} from "lucide-react";

function Uptime() {
  const [monitors, setMonitors] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://nightwalks.onrender.com/health");
        setMonitors(res.data.monitors);
      } catch (error) {
        console.error("Failed to fetch monitor data:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-yellow-500 bg-yellow-100 rounded-full text-sm font-medium">
            <PauseCircle className="w-4 h-4" /> Paused
          </span>
        );
      case 1:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-gray-500 bg-gray-200 rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4" /> Not Checked Yet
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-green-600 bg-green-100 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Up
          </span>
        );
      case 8:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-orange-600 bg-orange-100 rounded-full text-sm font-medium">
            <AlertTriangle className="w-4 h-4" /> Seems Down
          </span>
        );
      case 9:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-red-600 bg-red-100 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" /> Down
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-gray-600 bg-gray-100 rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4" /> Unknown
          </span>
        );
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-4 bg-black overflow-hidden py-10">
      <img
        src={stars}
        alt="Background stars"
        className="absolute left-0 top-0 w-full h-full object-cover opacity-30 z-0"
      />

      <div className="relative z-10 max-w-4xl w-full flex flex-col align-middle justify-center">
        <h1 className="text-4xl font-bold text-white mb-8">Uptime Monitor</h1>

        {monitors.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="space-y-6">
            {monitors.map((monitor, index) => (
              <div
                key={index}
                className="bg-gray-900 bg-opacity-60 rounded-xl p-6 shadow-lg border border-gray-700"
              >
                <h2 className="text-xl font-semibold text-green-400">
                  Attacus & Psyche (Nightwalks)
                </h2>
                <div className="text-white mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Status:</span>{" "}
                    {getStatusLabel(monitor.status)}
                  </p>
                  <p>
                    <span className="font-semibold">Uptime:</span>{" "}
                    {monitor.uptime}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {monitor.type}
                  </p>
                  <p>
                    <span className="font-semibold">Interval:</span>{" "}
                    {monitor.interval}
                  </p>
                  <p>
                    <span className="font-semibold">Response Time:</span>{" "}
                    {monitor.responseTime}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {monitor.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => Navigate("/devs")}
          className="px-6 py-3 m-40 bg-green-500 hover:bg-green-600 text-white text-xl font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Go Back
        </button>
      </div>
    </section>
  );
}

export default Uptime;
