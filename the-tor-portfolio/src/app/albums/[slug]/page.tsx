import { notFound } from "next/navigation";
import { albums } from "@/data/albums";
import AlbumPage from "@/components/AlbumPage";
import PageWrapper from "@/components/PageWrapper";

export default function AlbumDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();

  return (
    <PageWrapper>
      <AlbumPage album={album} />
    </PageWrapper>
  );
}
