"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="relative font-serif">
      {/* Menu Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="px-4 py-2 rounded-lg shadow-lg
            bg-white/30 backdrop-blur-md
             font-semibold text-gray-900
            border border-gray-500
            hover:bg-white/40 hover:text-gray-800
            transition"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white text-2xl z-40"
          >
            <Link
              href="/"
              className="mb-6 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/albums"
              className="mb-6 hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Albums
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
