"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FeaturedWeddings from "@/components/FeaturedWeddings";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import NavBar from "@/components/Navbar";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

export default function HomePage() {
  const { darkMode } = useTheme();
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  // Mouse position state for parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // max offset ±15px
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <main className={`transition-colors duration-500 ${darkMode ? "bg-black/95 text-gray-100 selection:bg-white selection:text-black" : "bg-white text-gray-900 selection:bg-black selection:text-white"}`}>
      <NavBar />

      {/* Hero Section with Parallax */}
      <section
        className="mb-10 relative w-full h-[90vh] flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background Image Only Moves */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: mousePos.x * 0.3,
            y: mousePos.y * 0.3,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <Image
            src="/hero-wedding.jpg"
            alt={t.homePage.heroAlt || "Wedding Photography"}
            fill
            priority
            className="object-cover scale-110"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero Text (Static) */}
        <div className="relative text-center px-4 z-10 text-shadow-lg">
          <h1 className="text-gray-100 text-5xl  md:text-7xl font-serif font-bold mb-5 ">
            {t.homePage.title || "The Tor Photography"}
          </h1>
          <p className="text-gray-100   md:text-xl tracking-wide">
            {t.homePage.subtitle || "Capturing Love Stories With Elegance"}
          </p>
        </div>

        {/* Scroll Arrow (Static) */}
        <div className="absolute bottom-8 w-full flex justify-center z-10">
          <span className="animate-bounce text-white text-2xl">↓</span>
        </div>
      </section>

      {/* About / Intro */}
      <section className="py-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-semibold mb-6">
          {t.homePage.welcomeTitle || "Welcome"}
        </h2>
        <p className={`text-lg ${darkMode ? "text-gray-300 leading-relaxed" : "text-gray-700 leading-relaxed"}`}>
          {t.homePage.aboutText ||
            "I'm Tor, a wedding photographer passionate about capturing authentic moments filled with love, joy, and timeless beauty. My approach is natural and elegant — telling your story through images that last a lifetime."}
        </p>
      </section>

      {/* Featured Weddings */}
      <FeaturedWeddings />

      {/* Call to Action */}
      <section className={`py-10 pb-12 px-6 text-center ${darkMode ? "bg-black/25" : "bg-white"}`}>
        <h2 className="text-3xl font-serif font-semibold mb-4">
          {t.homePage.ctaTitle || "Let's Create Timeless Memories"}
        </h2>
        <p className={darkMode ? "text-gray-300 mb-8" : "text-gray-600 mb-8"}>
          {t.homePage.ctaText || "I would love to hear about your wedding plans. Let's capture your story together."}
        </p>
        <Link
          href="/contact"
          className={` border inline-block font-bold py-3 px-8 rounded-full transition-colors hover:scale-105 ${
            darkMode ? "bg-white text-gray-900 hover:bg-black/70 hover:text-white hover:border-white " : "bg-black text-white hover:bg-gray-100 hover:text-black hover:border-black"
          }`}
        >
          {t.homePage.ctaButton || "Check Availability"}
        </Link>
      </section>
    </main>
  );
}
