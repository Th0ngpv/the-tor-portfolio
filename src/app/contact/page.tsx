"use client";

import NavBar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
import Image from "next/image";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  const contactItems = [
    {
      icon: "/icons/location.svg",
      content:
        "435/1 Hương Lộ 3, P. Bình Hưng Hoà, Q. Bình Tân, HCM City, Vietnam",
    },
    {
      icon: "/icons/phone.svg",
      content: (
        <a href="tel:+84908094341" className="hover:underline">
          +84 90 809 43 41
        </a>
      ),
    },
    {
      icon: "/icons/mail.svg",
      content: (
        <a href="mailto:thetorstudio@gmail.com" className="hover:underline">
          thetorstudio@gmail.com
        </a>
      ),
    },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/thetor1997/",
      icon: "/icons/instagram.svg",
    },
    {
      href: "https://www.facebook.com/profile.php?id=61567321138883",
      icon: "/icons/facebook.svg",
    },
  ];

  return (
    <main className="transition-colors duration-500 bg-background text-foreground selection:bg-foreground selection:text-background">
      {/* Navigation bar */}
      <NavBar />

      {/* Header */}
      <motion.header
        className="text-center py-10 px-6 mt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
          {t.contactPage.header || "Contact Us"}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-secondary leading-relaxed">
          {t.contactPage.intro ||
            "Reach out for inquiries, collaborations, or just to say hello."}
        </p>
      </motion.header>

      {/* Contact Section */}
      <motion.section
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Contact Info */}
        <div className="flex flex-col gap-6 text-center lg:text-left">
          {contactItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <Image
                src={item.icon}
                width={28}
                height={28}
                alt=""
                className="transition-colors dark:invert"
              />
              <p>{item.content}</p>
            </div>
          ))}

          <div className="flex gap-6 justify-center lg:justify-start mt-2">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Image
                  src={social.icon}
                  width={28}
                  height={28}
                  alt=""
                  className="transition-colors dark:invert"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
          <iframe
            src="https://www.google.com/maps?q=10.801849,106.610333&hl=en&z=15&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[350px] rounded-2xl border-0 shadow-sm"
          />
        </div>
      </motion.section>
    </main>
  );
}
