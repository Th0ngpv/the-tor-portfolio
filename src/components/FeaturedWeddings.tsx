"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";
import { useTheme } from "@/context/ThemeContext";

export default function FeaturedWeddings3D() {
  const { darkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const len = albums.length;

  const CARD_WIDTH = 340;
  const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.33);
  const SIDE_OFFSET = 380;
  const SCALE_SIDE = 0.75;
  const ROTATE_SIDE = 25;
  const DURATION = 0.6;

  const next = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((i) => (i + 1) % len);
    setTimeout(() => setAnimating(false), DURATION * 1000);
  };

  const prev = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((i) => (i - 1 + len) % len);
    setTimeout(() => setAnimating(false), DURATION * 1000);
  };

  const getPositionProps = (i: number) => {
    const offset = (i - activeIndex + len) % len;

    let x = 0,
      scale = 1,
      rotateY = 0,
      zIndex = 10,
      opacity = 1,
      opacityDelay = 0;

    if (offset === 0) {
      x = 0;
      scale = 1;
      rotateY = 0;
      zIndex = 10;
      opacity = 1;
    } else if (offset === 1 || offset === -len + 1) {
      x = SIDE_OFFSET;
      scale = SCALE_SIDE;
      rotateY = -ROTATE_SIDE;
      zIndex = 5;
      opacity = 0.9;
      opacityDelay = 0.3;
    } else if (offset === len - 1 || offset === -1) {
      x = -SIDE_OFFSET;
      scale = SCALE_SIDE;
      rotateY = ROTATE_SIDE;
      zIndex = 5;
      opacity = 0.9;
      opacityDelay = 0.3;
    } else {
      x = 0;
      scale = 0.7;
      rotateY = 0;
      zIndex = 1;
      opacity = 0;
    }

    return { x, scale, rotateY, zIndex, opacity, opacityDelay };
  };

  return (
    <section
      className={`py-12 overflow-hidden transition-colors duration-500 ${
        darkMode ? "border-t border-b border-black/50" : "bg-white"
      }`}
    >
      <h2 className="text-center text-3xl font-serif font-semibold mb-12">
        Featured Weddings
      </h2>

      <div
        className="relative w-full max-w-6xl mx-auto h-[540px] flex items-center justify-center"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (animating) return;
            const offset = info.offset.x;
            const velocity = info.velocity.x;

            if (offset < -50 || velocity < -500) {
              next();
            } else if (offset > 50 || velocity > 500) {
              prev();
            }
          }}
        >
          {albums.map((album, i) => {
            const { x, scale, rotateY, zIndex, opacity, opacityDelay } =
              getPositionProps(i);

            return (
              <motion.button
                key={album.slug}
                onClick={() => !animating && setActiveIndex(i)}
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
            darkMode ? "text-white bg-black" : "bg-white bg-white/50 backdrop-blur-sm"
          }`}
        >
          &#8249;
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className={`absolute right-4 top-1/2 -translate-y-1/2 shadow-lg text-xl p-2 rounded-full hover:scale-105 transition-colors ${
            darkMode ? "text-white bg-black" : "bg-white bg-white/50 backdrop-blur-sm"
          }`}
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
