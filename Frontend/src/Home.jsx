import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import stars from "./assets/stars-1654074.jpg";
import Logo from "./assets/Logo.webp";
import chameleon from "./assets/Chameleon.png";
import pitviper from "./assets/PitViper.png";

function Home() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-4 bg-black overflow-hidden">
      {/* Background Image */}
      <img
        src={stars}
        alt="Background stars"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Main Content */}

      <div className="absolute top-4 right-4 z-10 flex gap-4">
        <a
          href="https://www.instagram.com/attacusandpsyche"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-[#f2f2f2] text-3xl transition-colors duration-300 hover:text-[#10e549] active:scale-90"
        >
          <FaInstagram />
        </a>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl pt-4 mt-40 md:pt-2 text-center">
        <img
          src={Logo}
          alt="Attacus and Psyche Logo"
          className="rounded-full w-20 sm:w-28 md:w-32 mb-6"
        />

        <h1 className="text-white text-2xl sm:text-4xl font-bold mb-4">
          Welcome to Attacus & Psyche!
        </h1>
        <h3 className="text-white text-base sm:text-lg">
          Explore Bangalore city's ecology with us, one night-walk at a time!
          🍃🌙
        </h3>
      </div>

      <div className="flex justify-center mt-8 z-10">
        <Link
          to="/book"
          className="bg-gradient-to-r from-green-700 via-emerald-800 to-blue-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-800 transition-all duration-200 border-2 border-white/10 backdrop-blur-sm"
        >
          Book a Night Walk Slot
        </Link>
      </div>

      {/* Decorative Images */}
      <img
        src={chameleon}
        alt="Chameleon"
        className="absolute top-5 left-5 w-50 sm:w-100 opacity-40"
      />
      <img
        src={pitviper}
        alt="Pit Viper"
        className="absolute bottom-5 right-5 w-50 sm:w-100 opacity-36"
      />
    </section>
  );
}

export default Home;
