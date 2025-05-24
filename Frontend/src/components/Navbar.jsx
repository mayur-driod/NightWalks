import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

const navItems = [
  { name: "Home", to: "/" },
  { name: "Book Now", to: "/buy" },
  { name: "Confirm Booking", to: "/track" },
  { name: "Contact", to: "/contact" },
  { name: "Devs", to: "/devs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-black shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#2ad807] via-[#32bc52] to-[#669d57] bg-clip-text text-transparent">
          Attacus & Psyche
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-semibold border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
                    : "text-gray-700 hover:text-green-600"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
