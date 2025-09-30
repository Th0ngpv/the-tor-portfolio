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
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={toggleMenu}
          className={`
            relative w-10 h-10 flex items-center justify-center
            rounded-lg transition-all duration-500
            hover:scale-105
            ${
              menuOpen
                ? "text-white"
                : "text-gray-900 shadow-lg bg-white/10 backdrop-blur-sm"
            }
          `}
        >
          {/* Top bar */}
          <motion.span
            initial={false}
            animate={
              menuOpen
                ? { rotate: 45, y: 0 }
                : { rotate: 0, y: -6 }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          {/* Middle bar */}
          <motion.span
            initial={false}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          {/* Bottom bar */}
          <motion.span
            initial={false}
            animate={
              menuOpen
                ? { rotate: -45, y: 0 }
                : { rotate: 0, y: 6 }
            }
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
        </button>
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center text-white text-4xl space-y-8 z-40"
          >
            <Link
              href="/"
              className="hover:text-gray-300 transition-transform duration-300 hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/albums"
              className="hover:text-gray-300 transition-transform duration-300 hover:scale-105"
              onClick={() => setMenuOpen(false)}
            >
              Albums
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 transition-transform duration-300 hover:scale-105"
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
