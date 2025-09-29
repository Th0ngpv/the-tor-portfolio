// app/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url('/hero-image.jpg')` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-serif text-center px-4">
            Capturing Moments Between Moments
          </h1>
        </div>
      </motion.section>

      {/* Album Previews */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-semibold mb-12">Our Recent Weddings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {albums.map((album) => (
            <Link key={album.slug} href={`/albums/${album.slug}`} className="group block">
              <div
                className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-300"
              >
                {album.coverUrl && (
                  <Image
                    src={album.coverUrl}
                    alt={album.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-xl font-semibold">{album.title}</h3>
                  <p className="text-sm">{album.intro}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Capture Your Moments?</h2>
        <p className="mb-8">Let&apos;s create timeless memories together.</p>
        <Link
          href="/contact"
          className="bg-blue-600 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-700 mb-2">Email: hello@yourstudio.com</p>
        <p className="text-gray-700 mb-2">Phone: +123 456 7890</p>
        <p className="text-gray-700">Location: 123 Wedding Street, City, Country</p>
      </section>
    </main>
  );
}
