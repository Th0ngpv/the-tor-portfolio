"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const image = images[current];

  const [enableLayout, setEnableLayout] = useState(true);
  const mountedRef = useRef(false);
  const navTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    setEnableLayout(false);

    if (navTimerRef.current) window.clearTimeout(navTimerRef.current);

    navTimerRef.current = window.setTimeout(() => {
      setEnableLayout(true);
      navTimerRef.current = null;
    }, 80) as unknown as number;

    return () => {
      if (navTimerRef.current) window.clearTimeout(navTimerRef.current);
    };
  }, [current]);

  const handleClose = useCallback(() => {
    setEnableLayout(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onClose();
      });
    });
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={handleClose}
      >
        <motion.div
          className="relative max-w-6xl max-h-[90vh] w-auto h-auto p-2"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          {enableLayout ? (
            <motion.div layoutId={`image-${current}`} className="relative w-auto h-auto">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto h-auto rounded-lg shadow-lg object-contain"
              />
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={image.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="relative w-auto h-auto"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto h-auto rounded-lg shadow-lg object-contain"
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>

        {/* Fixed navigation buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          className="fixed top-1/2 left-4 -translate-y-1/2 p-4 md:p-6 bg-black/40 hover:bg-black/60 rounded-full text-white text-2xl md:text-3xl z-50"
        >
          ‹
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          className="fixed top-1/2 right-4 -translate-y-1/2 p-4 md:p-6 bg-black/40 hover:bg-black/60 rounded-full text-white text-2xl md:text-3xl z-50"
        >
          ›
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          aria-label="Close"
          className="fixed top-4 right-4 p-3 md:p-4 bg-black/50 text-white rounded-full hover:bg-black/70 z-50"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
