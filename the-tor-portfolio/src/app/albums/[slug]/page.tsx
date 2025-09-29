import { albums } from "@/data/albums";
import AlbumPage from "@/components/AlbumPage";

export default function AlbumDetail({ params }: { params: { slug: string } }) {
  const album = albums.find((a) => a.slug === params.slug);
  if (!album) return <div className="p-6">Album not found</div>;
  return <AlbumPage album={album} />;
}