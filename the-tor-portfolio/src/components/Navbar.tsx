"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = () => setMenuOpen((s) => !s);

  // keep animation duration in one place
  const overlayAnimDuration = 0.6; // seconds

  return (
    <div className="relative font-serif">
      {/* Menu Button */}
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={toggle}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 hover:scale-105 ${
            menuOpen
              ? "text-white"
              : "text-gray-900 shadow-lg bg-white/50 backdrop-blur-sm"
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
            onClick={() => setMenuOpen(false)} // close when clicking outside
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
  delay: number; // in seconds
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClose) onClose(); // trigger overlay close

    // Delay navigation until after animation finishes
    setTimeout(() => {
      router.push(href);
    }, delay * 1000); // convert seconds to ms
  };

  return (
    <div className="group relative">
      <Link
        href={href}
        onClick={handleClick}
        className="relative inline-block px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span className="relative z-10">{children}</span>

        {/* underline animation */}
        <span
          aria-hidden
          className="absolute left-0 -bottom-2 h-[2px] bg-white w-0 group-hover:w-full group-focus:w-full transition-all duration-300 ease-in-out"
        />
      </Link>
    </div>
  );
}
