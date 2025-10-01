export type Album = {
  slug: string;
  type: string;
  title: string;
  intro: string;
  coverUrl: string;
  images: { src: string; alt: string }[];
};

export const albums: Album[] = [
  {
    slug: "phuong-tuan",
    type: "Wedding",
    title: "Phuong & Tuan",
    intro: "A glimpse into their special day.",
    coverUrl: "/albums/phuong-tuan/06.jpg",
    images: [
      { src: "/albums/phuong-tuan/01.jpg", alt: "Couple walking" },
      { src: "/albums/phuong-tuan/02.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/03.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/04.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/05.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/06.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/07.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/08.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/09.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/10.jpg", alt: "Wedding ceremony" },
    ],
  },
  {
    slug: "dana-kuda",
    type: "Wedding",
    title: "Khoa & Ngoc",
    intro: "Beautiful memories captured with elegance.",
    coverUrl: "/albums/dana-kuda/01.jpg",
    images: [
      { src: "/albums/dana-kuda/01.jpg", alt: "Portrait of Dana & Kuda" }
    ],
  },
    {
    slug: "dana-kuda-copy",
    type: "Wedding",
    title: "An & Lan",
    intro: "Beautiful memories captured with elegance.",
    coverUrl: "/albums/dana-kuda/05.jpg",
    images: [
      { src: "/albums/phuong-tuan/07.jpg", alt: "Wedding ceremony" },
      { src: "/albums/dana-kuda/01.jpg", alt: "Portrait of Dana & Kuda" },
      { src: "/albums/phuong-tuan/05.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/06.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/08.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/09.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/10.jpg", alt: "Wedding ceremony" },
    ],
  },
  {
    slug: "phuong-tuan-copy",
    type: "Wedding",
    title: "Minh & Linh",
    intro: "A glimpse into their special day.",
    coverUrl: "/albums/phuong-tuan/02.jpg",
    images: [
      { src: "/albums/phuong-tuan/10.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/01.jpg", alt: "Couple walking" },
      { src: "/albums/phuong-tuan/02.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/03.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/04.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/09.jpg", alt: "Wedding ceremony" },
    ],
  },
  {
    slug: "phuong-tuan-this",
    type: "Wedding",
    title: "Minh & Lan",
    intro: "A glimpse into their special day.",
    coverUrl: "/albums/phuong-tuan/04.jpg",
    images: [
      { src: "/albums/phuong-tuan/10.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/01.jpg", alt: "Couple walking" },
      { src: "/albums/phuong-tuan/02.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/03.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/04.jpg", alt: "Wedding ceremony" },
      { src: "/albums/phuong-tuan/09.jpg", alt: "Wedding ceremony" },
    ],
  },
];
