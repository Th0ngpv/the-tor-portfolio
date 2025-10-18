import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "The Tor Portfolio",
  description: "A showcase of my work as a wedding photographer",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} antialiased`}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
      </body>
    </html>
  );
}
