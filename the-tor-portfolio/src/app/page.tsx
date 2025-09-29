"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { albums } from "@/data/albums";

export default function HomePage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
        <h1 className="text-5xl font-bold font-serif">My Portfolio</h1>
        <p className="mt-4 text-gray-600">Explore my photography albums</p>
      </motion.header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.slice(0, 3).map(album => (
          <motion.div key={album.slug} whileHover={{ scale: 1.03 }} className="cursor-pointer rounded-lg overflow-hidden">
            <Link href={`/albums/${album.slug}`}>
              <img src={album.coverUrl} alt={album.title} className="w-full h-64 object-cover rounded-lg" />
              <h2 className="mt-2 text-lg font-semibold">{album.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/albums" className="text-blue-600 hover:underline">View all albums →</Link>
      </div>
    </div>
  );
}
