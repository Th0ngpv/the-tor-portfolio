"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { Album } from "@/data/albums";
import Link from "next/link";
import NavBar from "./Navbar";

export default function AlbumPage({ album }: { album: Album }) {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <main className="min-h-screen transition-colors duration-500 bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* NavBar */}
      <NavBar />

      {/* Content wrapper */}
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-8"
        >
          <p className="text-sm uppercase text-secondary tracking-wider">{album.type}</p>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mt-2">{album.title}</h1>
          <p className="mt-4 text-secondary max-w-2xl mx-auto">{album.intro}</p>
        </motion.header>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 p-6 max-w-6xl mx-auto">
          {album.images.map((img, i) => (
            <motion.div
              key={img.src}
              layoutId={`image-${i}`}                 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="mb-4 break-inside-avoid cursor-pointer"
              onClick={() => setCurrent(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg border border-border"
              />
            </motion.div>
          ))}
        </div>

        {/* Footer links */}
        <motion.div
          className="flex justify-between items-center mt-8 px-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/albums" className="text-sm md:text-base text-secondary hover:underline">← More albums</Link>
          <Link href="/" className="text-sm md:text-base text-secondary hover:underline">Back to Home →</Link>
        </motion.div>

        {/* Lightbox */}
        {current !== null && (
          <Lightbox
            images={album.images}
            current={current}
            onClose={() => setCurrent(null)}
            onPrev={() =>
              setCurrent((c) => (c! - 1 + album.images.length) % album.images.length)
            }
            onNext={() => setCurrent((c) => (c! + 1) % album.images.length)}
          />
        )}
      </div>
    </main>
  );
}
