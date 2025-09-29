import { albums } from "@/data/albums";
import AlbumPage from "@/components/AlbumPage";

export default async function AlbumDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const album = albums.find((a) => a.slug === slug);
  if (!album) return <div className="p-6">Album not found</div>;

  return <AlbumPage album={album} />;
}
