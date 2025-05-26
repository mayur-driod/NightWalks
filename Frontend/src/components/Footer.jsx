import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[rgba(0,0,0)] text-[#f2f2f2] text-center px-4 py-5 font-sans w-full absolute left-0">
      <div className="max-w-screen-xl mx-auto flex flex-row justify-between items-center">
        <div className="flex gap-4">
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
        <p className="text-sm">
          © 2025 Chayant Gonsalves. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
