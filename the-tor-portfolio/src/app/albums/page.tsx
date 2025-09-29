import Link from "next/link";
import Image from "next/image";
import { albums } from "@/data/albums";

export default function AlbumsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Albums</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Link key={album.slug} href={`/albums/${album.slug}`} className="group block cursor-pointer">
            <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={album.images[0].src} // first image as cover
                alt={album.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm uppercase text-gray-500">{album.type}</p>
              <h2 className="text-xl font-semibold">{album.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
