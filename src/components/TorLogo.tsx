"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function TorLogo() {
  const { darkMode } = useTheme();

  return (
    <Link href="/" aria-label="Tor Home">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className={`fixed bottom-6 left-6 z-50 flex items-center justify-center
          px-5 w-13 h-13 rounded-lg font-serif text-xl font-bold
          cursor-pointer select-none backdrop-blur-sm shadow-lg hover:scale-105 transition-all
          ${darkMode
            ? "text-white bg-black/50 border border-gray-700"
            : "text-black bg-white/50 border border-gray-300"
          }`}
        style={{
          letterSpacing: "0.05em",
        }}
      >
        Tor
      </motion.div>
    </Link>
  );
}
