"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";
import NavBar from "@/components/Navbar";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

export default function AlbumsPage() {
  const { darkMode } = useTheme();
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  return (
<main className={`${darkMode ? "bg-black/95 text-white" : "bg-white text-gray-900"} min-h-screen`}>
  <div className="p-6 max-w-6xl mx-auto">
    <NavBar />
    <motion.h1
      className="text-4xl md:text-5xl font-serif font-bold text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {t.albumsPage.title}
    </motion.h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {albums.map((album, i) => (
        <motion.div
          key={album.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <Link href={`/albums/${album.slug}`} className="group block">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200 shadow-xl">
              {album.coverUrl ? (
                <Image
                  src={album.coverUrl}
                  alt={album.title}
                  fill
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-700">
                  {t.albumsPage.noCover}
                </div>
              )}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold font-serif">{album.title}</h3>
                <p className="text-sm">{album.intro}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

    <motion.div
      className="flex justify-between items-center mt-8 px-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Link href="/" className={`text-sm md:text-base ${darkMode ? "text-white" : "text-gray-700"} hover:underline`}>
        {t.albumsPage.back}
      </Link>
      <Link href="/contact" className={`text-sm md:text-base ${darkMode ? "text-white" : "text-gray-700"} hover:underline`}>
        {t.albumsPage.forward}
      </Link>
    </motion.div>
  </div>
</main>

  );
}
