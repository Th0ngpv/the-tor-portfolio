"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import TorLogo from "@/components/TorLogo";


export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { lang, toggleLang } = useLanguage();
  const overlayAnimDuration = 0.6;

  const toggleMenu = () => setMenuOpen((s) => !s);

  // Translation dictionary
  const menuLabels: Record<string, { home: string; albums: string; contact: string }> = {
    en: { home: "Home", albums: "Albums", contact: "Contact" },
    vi: { home: "Trang chủ", albums: "Album", contact: "Liên hệ" },
  };

  const labels = menuLabels[lang];

  return (
    <div className="relative font-serif">
      {/* Floating Tor Logo */}
      <TorLogo />

      {/* Top-right buttons */}
      <div className="fixed top-5 right-5 z-50 flex items-center space-x-2">
        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 hover:scale-105 
            ${darkMode
              ? "text-white shadow-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700"
              : "text-gray-900 shadow-lg bg-white/50 backdrop-blur-sm"
            }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <motion.svg
            key={darkMode ? "moon" : "sun"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            exit={{ rotate: -360, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {darkMode ? (
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="5" />
                <g stroke="currentColor" strokeWidth="1.5">
                  <line x1="12" y1="0" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="24" />
                  <line x1="0" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="24" y2="12" />
                  <line x1="4" y1="4" x2="7" y2="7" />
                  <line x1="17" y1="17" x2="20" y2="20" />
                  <line x1="4" y1="20" x2="7" y2="17" />
                  <line x1="17" y1="7" x2="20" y2="4" />
                </g>
              </>
            )}
          </motion.svg>
        </button>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg backdrop-blur-sm
            transition-all duration-500 hover:scale-105 
            ${menuOpen
              ? "text-white bg-black/5 border-0"
              : darkMode
                ? "text-white bg-black/10 border border-gray-700"
                : "text-gray-900 shadow-lg bg-white/50"
            }`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            initial={false}
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          <motion.span
            initial={false}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          <motion.span
            initial={false}
            animate={menuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
        </button>
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: overlayAnimDuration, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center text-white text-4xl space-y-8 z-40"
            role="dialog"
            aria-modal="true"
          >
            <LinkWrapper href="/" onClose={() => setMenuOpen(false)} delay={overlayAnimDuration}>{labels.home}</LinkWrapper>
            <LinkWrapper href="/albums" onClose={() => setMenuOpen(false)} delay={overlayAnimDuration}>{labels.albums}</LinkWrapper>
            <LinkWrapper href="/contact" onClose={() => setMenuOpen(false)} delay={overlayAnimDuration}>{labels.contact}</LinkWrapper>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLang}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              whileTap={{ rotate: 360, scale: 0.9 }}
              transition={{ delay: 0.2, duration: 0.4, ease: "easeInOut" }}
              className="mt-6 px-6 py-3 rounded-lg border border-white text-white text-2xl hover:bg-white/20 transition-colors"
            >
              {lang.toUpperCase()}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LinkWrapper({ href, children, onClose, delay }: { href: string; children: React.ReactNode; onClose?: () => void; delay: number }) {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) onClose();
    setTimeout(() => router.push(href), delay * 1000);
  };

  return (
    <div className="group relative">
      <Link href={href} onClick={handleClick} className="relative inline-block px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
        <span className="relative z-10">{children}</span>
        <span aria-hidden className="absolute left-0 -bottom-2 h-[2px] bg-white w-0 group-hover:w-full group-focus:w-full transition-all duration-300 ease-in-out" />
      </Link>
    </div>
  );
}
