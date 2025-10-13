"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";
import { useTheme } from "@/context/ThemeContext";

export default function FeaturedWeddings3D() {
  const { darkMode } = useTheme(); // Theme context to toggle dark/light mode
  const [activeIndex, setActiveIndex] = useState(0); // Currently focused album
  const [animating, setAnimating] = useState(false); // Prevent actions while animating
  const len = albums.length; // Total number of albums

  // Card display constants
  const CARD_WIDTH = 340;
  const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.33); // Standard 4:3-ish ratio
  const SIDE_OFFSET = 380; // Horizontal distance for side cards
  const SCALE_SIDE = 0.75; // Scale for side cards
  const ROTATE_SIDE = 25; // Y-axis rotation for side cards
  const DURATION = 0.6; // Animation duration

  // Go to next album
  const next = () => {
    if (animating) return; // Prevent multiple triggers during animation
    setAnimating(true);
    setActiveIndex((i) => (i + 1) % len); // Wrap around
    setTimeout(() => setAnimating(false), DURATION * 1000); // Reset animating after duration
  };

  // Go to previous album
  const prev = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((i) => (i - 1 + len) % len); // Wrap around
    setTimeout(() => setAnimating(false), DURATION * 1000);
  };

  // Calculate the 3D position, scale, rotation, and opacity for each card
  const getPositionProps = (i: number) => {
    const offset = (i - activeIndex + len) % len;

    let x = 0,
      scale = 1,
      rotateY = 0,
      zIndex = 10,
      opacity = 1,
      opacityDelay = 0;

    if (offset === 0) {
      // Center card
      x = 0;
      scale = 1;
      rotateY = 0;
      zIndex = 10;
      opacity = 1;
    } else if (offset === 1 || offset === -len + 1) {
      // Card to the right
      x = SIDE_OFFSET;
      scale = SCALE_SIDE;
      rotateY = -ROTATE_SIDE;
      zIndex = 5;
      opacity = 0.9;
      opacityDelay = 0.3;
    } else if (offset === len - 1 || offset === -1) {
      // Card to the left
      x = -SIDE_OFFSET;
      scale = SCALE_SIDE;
      rotateY = ROTATE_SIDE;
      zIndex = 5;
      opacity = 0.9;
      opacityDelay = 0.3;
    } else {
      // Hidden cards (back)
      x = 0;
      scale = 0.7;
      rotateY = 0;
      zIndex = 1;
      opacity = 0;
    }

    return { x, scale, rotateY, zIndex, opacity, opacityDelay };
  };

  // Wheel scroll support (optional, currently scrolls page too)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (animating) return;
      if (e.deltaY < 0 || e.deltaX < 0) prev();
      else if (e.deltaY > 0 || e.deltaX > 0) next();
    };
    // Listen to global wheel events
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [animating]);

  return (
    <section
      className={`py-12 overflow-hidden transition-colors duration-500 ${
        darkMode ? "border-t border-b border-black/50" : "bg-white"
      }`}
    >
      {/* Section title */}
      <h2 className="text-center text-3xl font-serif font-semibold mb-5">
        Featured Weddings
      </h2>

      {/* Carousel container */}
      <div
        className="relative w-full max-w-6xl mx-auto h-[540px] flex items-center justify-center"
        style={{ perspective: 1500 }} // 3D perspective
      >
        {/* Carousel inner container */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          drag="x" // Enable horizontal drag
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (animating) return;
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            // Decide next/prev based on drag distance and speed
            if (offset < -50 || velocity < -500) {
              next();
            } else if (offset > 50 || velocity > 500) {
              prev();
            }
          }}
        >
          {/* Render all albums */}
          {albums.map((album, i) => {
            const { x, scale, rotateY, zIndex, opacity, opacityDelay } =
              getPositionProps(i);

            return (
              <motion.button
                key={album.slug}
                onClick={() => !animating && setActiveIndex(i)} // Set active album on click
                initial={false}
                animate={{ x, scale, rotateY, opacity }}
                transition={{
                  x: { duration: DURATION, ease: "easeInOut" },
                  scale: { duration: DURATION, ease: "easeInOut" },
                  rotateY: { duration: DURATION, ease: "easeInOut" },
                  opacity: {
                    duration: DURATION / 2,
                    ease: "easeInOut",
                    delay: opacityDelay,
                  },
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-lg p-0 border-0 bg-transparent"
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  zIndex,
                  cursor: "pointer",
                  transformStyle: "preserve-3d",
                }}
                aria-label={`Show ${album.title}`}
              >
                <Link href={`/albums/${album.slug}`} className="block">
                  <Image
                    src={album.coverUrl}
                    alt={album.title}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    className="block rounded-xl object-cover"
                  />
                  <div
                    className={`absolute top-1 left-0 w-full font-serif text-center py-2 rounded-b-xl text-white/85`}
                  >
                    {album.title}
                  </div>
                </Link>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Navigation buttons */}
        <button
          onClick={prev}
          aria-label="Previous"
          className={`absolute left-4 top-1/2 -translate-y-1/2 shadow-lg text-xl p-2 rounded-full hover:scale-105 transition-colors ${
            darkMode ? "text-white bg-black" : "bg-white/50 backdrop-blur-sm"
          }`}
        >
          &#8249; {/* Left arrow */}
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className={`absolute right-4 top-1/2 -translate-y-1/2 shadow-lg text-xl p-2 rounded-full hover:scale-105 transition-colors ${
            darkMode ? "text-white bg-black" : "bg-white/50 backdrop-blur-sm"
          }`}
        >
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </section>
  );
}
