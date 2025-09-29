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
      { src: "/albums/naja-rasmus/01.jpg", alt: "Couple walking" },
      { src: "/albums/naja-rasmus/02.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/03.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/04.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/05.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/06.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/07.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/08.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/09.jpg", alt: "Wedding ceremony" },
      { src: "/albums/naja-rasmus/10.jpg", alt: "Wedding ceremony" },
    ],
  },
  {
    slug: "dana-kuda",
    type: "Wedding",
    title: "Dana & Kuda",
    intro: "Beautiful memories captured with elegance.",
    images: [
      { src: "/albums/dana-kuda/01.jpg", alt: "Portrait of Dana & Kuda" }
    ],
  },
];
