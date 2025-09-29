"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type LightboxProps = {
  images: { src: string; alt: string }[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  images,
  current,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
        aria-modal="true"
        role="dialog"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 text-white text-3xl"
        >
          ✕
        </button>

        <button
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-6 text-white text-2xl"
        >
          ◀
        </button>

        <div className="max-w-6xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={images[current].src}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.36 }}
              className="mx-auto"
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={images[current].src}
                  alt={images[current].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-white text-center mt-4">{images[current].alt}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={onNext}
          aria-label="Next"
          className="absolute right-6 text-white text-2xl"
        >
          ▶
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
