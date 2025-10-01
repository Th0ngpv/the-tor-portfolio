"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext"; // dark mode context

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((s) => !s);

  const { darkMode, toggleDarkMode } = useTheme();


  const overlayAnimDuration = 0.6;

  return (
    <div className="relative font-serif">
      {/* Buttons Container */}
      <div className="fixed top-5 right-5 z-50 flex items-center space-x-2">
        {/* Dark Mode Button */}
        <button
          onClick={toggleDarkMode}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 hover:scale-105 
            ${darkMode? "text-white shadow-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700"
            : "text-gray-900 shadow-lg bg-white/50 backdrop-blur-sm "
            }`}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {/* Sun / Moon SVG with animation */}
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
              // Moon icon (smooth crescent)
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            ) : (
              // Sun icon (circle + rays)
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
             ${
              menuOpen
                ? "text-white bg-black/5 border-0" // <- menuOpen overrides everything
                : darkMode
                ? "text-white bg-black/10 border border-gray-700"
                : "text-gray-900 shadow-lg bg-white/50"
            }`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {/* Top bar */}
          <motion.span
            initial={false}
            animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          {/* Middle bar */}
          <motion.span
            initial={false}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute block w-6 h-0.5 bg-current rounded origin-center"
          />
          {/* Bottom bar */}
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
            onClick={() => setMenuOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <LinkWrapper
              href="/"
              onClose={() => setMenuOpen(false)}
              delay={overlayAnimDuration}
            >
              Home
            </LinkWrapper>
            <LinkWrapper
              href="/albums"
              onClose={() => setMenuOpen(false)}
              delay={overlayAnimDuration}
            >
              Albums
            </LinkWrapper>
            <LinkWrapper
              href="/contact"
              onClose={() => setMenuOpen(false)}
              delay={overlayAnimDuration}
            >
              Contact
            </LinkWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* helper - link with delayed navigation */
function LinkWrapper({
  href,
  children,
  onClose,
  delay,
}: {
  href: string;
  children: React.ReactNode;
  onClose?: () => void;
  delay: number;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClose) onClose();

    setTimeout(() => {
      router.push(href);
    }, delay * 1000);
  };

  return (
    <div className="group relative">
      <Link
        href={href}
        onClick={handleClick}
        className="relative inline-block px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="relative z-10">{children}</span>

        <span
          aria-hidden
          className="absolute left-0 -bottom-2 h-[2px] bg-white w-0 group-hover:w-full group-focus:w-full transition-all duration-300 ease-in-out"
        />
      </Link>
    </div>
  );
}
