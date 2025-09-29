"use client";
import { useState } from "react";
import { Album } from "@/data/albums";
import Lightbox from "@/components/Lightbox";

export default function AlbumPage({ album }: { album: Album }) {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <div>
      {/* Hero section */}
      <section className="text-center py-12">
        <p className="uppercase text-gray-500">{album.type}</p>
        <h1 className="text-4xl font-bold">{album.title}</h1>
        <p className="mt-4 text-lg text-gray-700">{album.intro}</p>
      </section>

      {/* Gallery grid */}
      <section className="grid gap-2 p-4 sm:grid-cols-2 md:grid-cols-3">
        {album.images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={`cursor-pointer rounded-xl shadow ${
              idx === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </section>

      {/* Navigation */}
      <div className="flex justify-between p-6">
        <a href="/weddings/albums" className="text-blue-600 hover:underline">
          ← More albums
        </a>
        <a href="/weddings" className="text-blue-600 hover:underline">
          Back to Weddings →
        </a>
      </div>

      {/* Lightbox (placeholder) */}
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
  );
}
