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

  // Controls whether the shared layout animation (layoutId) is applied.
  // We temporarily disable layout-based morphing while the user navigates between images
  // to avoid jarring aspect-ratio morphs between portrait/landscape images.
  const [enableLayout, setEnableLayout] = useState(true);

  // Tracks whether the component has mounted so the initial mount is not treated as navigation.
  const mountedRef = useRef(false);

  // Stores the navigation debounce timer so it can be cleared on unmount.
  const navTimerRef = useRef<number | null>(null);

  // When `current` changes (i.e., user navigated to a different image), disable the shared
  // layout animation briefly and re-enable it after a short debounce. This prevents
  // Framer Motion from attempting an undesired morph between images with different dimensions.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    setEnableLayout(false);

    if (navTimerRef.current) {
      window.clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }

    // Re-enable layout after a short delay to allow the DOM to update.
    navTimerRef.current = window.setTimeout(() => {
      setEnableLayout(true);
      navTimerRef.current = null;
    }, 80) as unknown as number;

    return () => {
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
        navTimerRef.current = null;
      }
    };
  }, [current]);

  // Close handler that ensures the shared layout animation is enabled before unmounting.
  // Uses two requestAnimationFrame ticks so the browser can paint the enabled layout state,
  // allowing Framer Motion to perform the shared-layout animation reliably on unmount.
  const handleClose = useCallback(() => {
    setEnableLayout(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onClose();
      });
    });
  }, [onClose]);

  // Keyboard navigation: Escape closes, ArrowLeft/Right navigate images.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, onPrev, onNext]);

  // Ensure any pending navigation timer is cleared on unmount to avoid leaks.
  useEffect(() => {
    return () => {
      if (navTimerRef.current) {
        window.clearTimeout(navTimerRef.current);
        navTimerRef.current = null;
      }
    };
  }, []);

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
          transition={{ duration: 0.5 }} // slower open/close for a smoother visual
          onClick={(e) => e.stopPropagation()}
        >
          {/*
            If layout-based morphing is enabled we render the image with a layoutId
            so Framer Motion performs the shared-layout animation (used for open/close).
            If disabled (during navigation) we render a keyed node that crossfades instead.
          */}
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

          {/* Navigation controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="Close"
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
