import { notFound } from "next/navigation";
import { albums } from "@/data/albums";
import AlbumPage from "@/components/AlbumPage";

export default function AlbumDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();

  return (
      <AlbumPage album={album} />
  );
}
