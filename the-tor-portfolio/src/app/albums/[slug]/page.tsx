import { albums } from "@/data/albums";
import AlbumPage from "@/components/AlbumPage";

export default function AlbumDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const album = albums.find((a) => a.slug === slug);
  if (!album) return <div className="p-6">Album not found</div>;

  return <AlbumPage album={album} />;
}
