"use client";

import NavBar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

export default function ContactPage() {
  const { darkMode } = useTheme();
  const { lang } = useLanguage();
  const t = lang === "en" ? en : vi;

  const contactItems = [
    {
      icon: <MapPin size={24} className="text-red-500" />,
      content:
        "435/1 Hương Lộ 3, P. Bình Hưng Hoà, Q. Bình Tân, HCM City, Vietnam",
    },
    {
      icon: <Phone size={24} className="text-green-500" />,
      content: (
        <a href="tel:+84908094341" className="hover:underline">
          +84 90 809 43 41
        </a>
      ),
    },
    {
      icon: <Mail size={24} className="text-blue-500" />,
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
      icon: (
        <Instagram
          size={28}
          className="hover:text-pink-500 transition-colors"
        />
      ),
    },
    {
      href: "https://www.facebook.com/profile.php?id=61567321138883",
      icon: (
        <Facebook
          size={28}
          className="hover:text-blue-500 transition-colors"
        />
      ),
    },
  ];

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black/95 text-white" : "bg-white text-gray-900"
        }`}
    >
      <NavBar />

      <motion.div
        className="flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t.contactPage.header || "Contact Us"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            {t.contactPage.intro ||
              "Have a question, collaboration idea, or just want to connect? Reach out through any of the channels below — I’d love to hear from you."}
          </p>
        </motion.header>

        {/* Contact Section */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center"
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
                {item.icon}
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
                  className="hover:scale-110 transition-transform"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <iframe
              src="https://www.google.com/maps?q=10.801849,106.610333&hl=en&z=15&output=embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] rounded-2xl border-0 shadow-sm"
            />
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
