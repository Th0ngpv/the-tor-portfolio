export type Album = {
  slug: string;
  type: string;
  title: string;
  intro: string;
  images: { src: string; alt: string }[];
};

export const albums: Album[] = [
  {
    slug: "naja-rasmus",
    type: "Wedding",
    title: "Naja & Rasmus",
    intro: "A glimpse into their special day.",
    images: [
      { src: "/images/albums/naja-rasmus/01.jpg", alt: "Couple walking" },
      { src: "/images/albums/naja-rasmus/02.jpg", alt: "Wedding ceremony" }
    ],
  },
  {
    slug: "dana-kuda",
    type: "Wedding",
    title: "Dana & Kuda",
    intro: "Beautiful memories captured with elegance.",
    images: [
      { src: "/images/albums/dana-kuda/01.jpg", alt: "Portrait of Dana & Kuda" }
    ],
  },
];
