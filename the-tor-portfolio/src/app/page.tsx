"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FeaturedWeddings from "@/components/FeaturedWeddings";
import { useTheme } from "@/context/ThemeContext";
import NavBar from "@/components/Navbar";

export default function HomePage() {
  const { darkMode } = useTheme();

  return (
    <main className={`transition-colors duration-500 
    ${darkMode ? "bg-black/95 text-gray-100" : "bg-white text-gray-900"}`}>
      <NavBar />

      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[90vh] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/hero-wedding.jpg"
          alt="Wedding Photography"
          fill
          priority
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-black/30`} />
        <div className="relative text-center px-4">
          <h1 className="text-gray-100 text-5xl md:text-7xl font-serif font-bold mb-4">
            The Tor Photography
          </h1>
          <p className="text-gray-100 text-lg md:text-xl font-light tracking-wide">
            Capturing Love Stories With Elegance
          </p>
        </div>
        <div className="absolute bottom-8 w-full flex justify-center">
          <span className="animate-bounce">↓</span>
        </div>
      </motion.section>

      {/* About / Intro */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-semibold mb-6">
          Welcome
        </h2>
        <p className={darkMode ? "text-gray-300 leading-relaxed" : "text-gray-700 leading-relaxed"}>
          I’m Tor, a wedding photographer passionate about capturing
          authentic moments filled with love, joy, and timeless beauty.
          My approach is natural and elegant — telling your story
          through images that last a lifetime.
        </p>
      </section>

      {/* Featured Weddings */}
      <FeaturedWeddings />

      {/* Call to Action */}
      <section className={`py-20 px-6 text-center ${darkMode ? "bg-black/75" : "bg-white"}`}>
        <h2 className="text-3xl font-serif font-semibold mb-4">
          Let’s Create Timeless Memories
        </h2>
        <p className={darkMode ? "text-gray-300 mb-8" : "text-gray-600 mb-8"}>
          I would love to hear about your wedding plans. Let’s capture
          your story together.
        </p>
        <Link
          href="/contact"
          className={`inline-block font-bold py-3 px-8 rounded-full transition-colors ${
            darkMode
              ? "bg-white text-gray-900 hover:bg-gray-200"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Book Your Wedding
        </Link>
      </section>

      {/* Footer */}
      <footer className={darkMode ? "py-12 text-center text-gray-400 text-sm" : "py-12 text-center text-gray-600 text-sm"}>
        <p>© {new Date().getFullYear()} The Tor Photography</p>
        <p className="mt-2">
          <a href="mailto:hello@thetorphotography.com" className="hover:underline">
            hello@thetorphotography.com
          </a>{" "}
          | <a href="https://instagram.com/thetorphotography" target="_blank" className="hover:underline">
            Instagram
          </a>
        </p>
      </footer>
    </main>
  );
}
