import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-4">
          Capture the Wild, Own the Moment
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Discover stunning wildlife photography and buy your favorite shots as
          prints or digital downloads.
        </p>

        <div className="w-full overflow-hidden rounded-xl shadow-lg mb-10 relative">
          <img
            src="https://res.cloudinary.com/dh4zgual6/image/upload/v1744810516/TerraQuest/Sightings/oiftxsbprqhn8dbeprk9.jpg"
            alt="Featured Wildlife"
            className="w-full h-[400px] object-cover"
          />
          <span
            className="absolute bottom-2 right-2 text-white text-sm sm:text-base opacity-70 pointer-events-none select-none"
            style={{ textShadow: "0 0 3px rgba(0,0,0,0.7)" }}
          >
            © Mayur Setty
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/buy"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition"
          >
            Purchase Now
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium rounded-md transition"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
