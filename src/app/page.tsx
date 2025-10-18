"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

import NavBar from "@/components/Navbar";
import FeaturedWeddings from "@/components/FeaturedWeddings";
import HeroMaskIntro from "@/components/HeroMaskIntro";

export default function HomePage() {
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  return (
    <main className="transition-colors duration-500 bg-background text-foreground selection:bg-foreground selection:text-background">
      
      {/* Navigation bar */}
      <NavBar />

      {/* Hero */}
      <HeroMaskIntro />

      {/* About */}
      <section className="py-10 max-w-3xl mx-auto px-6 text-center bg-background">
        <h2 className="text-3xl font-serif font-semibold mb-6">
          {t.homePage.welcomeTitle || "Welcome"}
        </h2>
        <p className="text-lg text-secondary leading-relaxed">
          {t.homePage.aboutText ||
            "I'm Tor, a wedding photographer passionate about capturing authentic moments filled with love, joy, and timeless beauty. My approach is natural and elegant — telling your story through images that last a lifetime."}
        </p>
      </section>

      {/* Featured Weddings */}
      <FeaturedWeddings />

      {/* Call to Action */}
      <section className="py-10 pb-12 px-6 text-center bg-background">
        <h2 className="text-3xl font-serif font-semibold mb-4">
          {t.homePage.ctaTitle || "Let's Create Timeless Memories"}
        </h2>
        <p className="text-secondary mb-8">
          {t.homePage.ctaText || "I would love to hear about your wedding plans. Let's capture your story together."}
        </p>
        <Link
          href="/contact"
          className="border inline-block font-bold py-3 px-8 rounded-full transition-all bg-background text-primary hover:scale-105 hover:bg-foreground hover:text-background hover:border-accent"
        >
          {t.homePage.ctaButton || "Check Availability"}
        </Link>
      </section>
    </main>
  );
}
