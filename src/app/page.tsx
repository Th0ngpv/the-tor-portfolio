"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import NavBar from "@/components/Navbar";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

import FeaturedWeddings from "@/components/FeaturedWeddings";
import HeroMaskIntro from "@/components/HeroMaskIntro";

export default function HomePage() {
  const { darkMode } = useTheme();
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  return (
    
    <main className={`transition-colors duration-500 ${darkMode ? "bg-black/95 text-gray-100 selection:bg-white selection:text-black" : "bg-white text-gray-900 selection:bg-black selection:text-white"}`}>
      
      <NavBar />

      {/* Hero Section with Parallax */}
      <HeroMaskIntro />

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
