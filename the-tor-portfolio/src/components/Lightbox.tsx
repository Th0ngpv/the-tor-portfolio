"use client";
import { useEffect } from "react";

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
  // Keyboard navigation
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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-6 right-6 text-white text-3xl">✕</button>
      <button onClick={onPrev} className="absolute left-6 text-white text-2xl">◀</button>
      <div className="max-w-5xl max-h-[80vh]">
        <img src={images[current].src} alt={images[current].alt} className="max-h-[80vh] rounded-xl" />
        <p className="text-white text-center mt-4">{images[current].alt}</p>
      </div>
      <button onClick={onNext} className="absolute right-6 text-white text-2xl">▶</button>
    </div>
  );
}
