"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";
import NavBar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

export default function AlbumsPage() {
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  return (
    <main className="min-h-screen transition-colors duration-500 bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Navigation */}
      <NavBar />

      {/* Wrapper */}
      <div className="px-6 pt-24 pb-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.albumsPage.title || "Wedding Albums"}
        </motion.h1>

        {/* Album Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {albums.map((album, i) => (
            <motion.div
              key={album.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/albums/${album.slug}`}
                className="group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative w-full h-64 bg-secondary/10 rounded-lg overflow-hidden">
                  {album.coverUrl ? (
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
                      {t.albumsPage.noCover || "No cover available"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-serif font-semibold">
                      {album.title}
                    </h3>
                    <p className="text-sm opacity-90">{album.intro}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer navigation */}
        <motion.div
          className="flex justify-between items-center mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="text-sm md:text-base underline-offset-4 hover:underline transition-colors"
          >
            {t.albumsPage.back || "← Back to Home"}
          </Link>
          <Link
            href="/contact"
            className="text-sm md:text-base underline-offset-4 hover:underline transition-colors"
          >
            {t.albumsPage.forward || "Next: Contact →"}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
