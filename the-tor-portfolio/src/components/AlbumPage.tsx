"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import { Album } from "@/data/albums";

export default function AlbumPage({ album }: { album: Album }) {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* header */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center mb-8"
      >
        <p className="text-sm uppercase text-gray-500 tracking-wider">{album.type}</p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">{album.title}</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{album.intro}</p>
      </motion.header>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {album.images.map((img, i) => (
          <motion.button
            key={img.src}
            onClick={() => setCurrent(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ scale: 1.03 }}
            className={`cursor-pointer rounded-lg overflow-hidden focus:outline-none`}
          >
            <div className={`relative w-full ${i === 0 ? "h-96 md:h-[520px]" : "h-64 md:h-80"}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* nav */}
      <motion.div
        className="flex justify-between items-center mt-8 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <a href="/albums" className="text-sm text-gray-700 hover:underline">← More albums</a>
        <a href="/weddings" className="text-sm text-gray-700 hover:underline">Back to Weddings →</a>
      </motion.div>

      {/* lightbox */}
      {current !== null && (
        <Lightbox
          images={album.images}
          current={current}
          onClose={() => setCurrent(null)}
          onPrev={() => setCurrent((c) => (c! - 1 + album.images.length) % album.images.length)}
          onNext={() => setCurrent((c) => (c! + 1) % album.images.length)}
        />
      )}
    </div>
  );
}
