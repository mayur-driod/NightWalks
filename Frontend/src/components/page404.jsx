import React from "react";
import stars from "../assets/stars-1654074.jpg";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 overflow-hidden">
      <img
        src={stars}
        alt="Background stars"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-widest text-white drop-shadow-lg animate-pulse">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-light">Oops! Page not found</p>
        <p className="text-md md:text-lg max-w-xl text-gray-300">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back home safely through the stars.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transition duration-300 text-lg"
        >
          Go Home
        </button>
      </div>
    </section>
  );
}

export default Page404;
