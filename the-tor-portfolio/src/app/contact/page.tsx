"use client";

import NavBar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function ContactPage() {
  const { darkMode } = useTheme();
  return (
    // Full-page container for background
    <main className={`${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} min-h-screen`}>
      
      {/* Centered content wrapper */}
      <div className="p-6 max-w-3xl mx-auto">
        <NavBar/>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <p className="text-sm uppercase text-gray-500 tracking-wider">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">Contact Me</h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Have a question, project idea, or just want to say hello?  
            Fill out the form below and I’ll get back to you as soon as possible.
          </p>
        </motion.header>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Form submitted! (You can connect this to an API or email service)");
          }}
        >
          <div>
            <label htmlFor="name" className={`block text-sm font-medium
              ${darkMode ? "text-white" : "text-gray-700"}`}>
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium
              ${darkMode ? "text-white" : "text-gray-700"}`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <div>
            <label htmlFor="message" className={`block text-sm font-medium
              ${darkMode ? "text-white" : "text-gray-700"}`}>
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-black focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors
              ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            Send Message
          </button>
        </motion.form>

        {/* Footer Contact Info */}
        <motion.div
          className="text-center mt-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600">Or reach me directly:</p>
          <p className="font-medium">your@email.com</p>
          <div className="flex justify-center gap-6 text-gray-600">
            <Link href="https://instagram.com" target="_blank" className="hover:text-black">Instagram</Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-black">Twitter</Link>
            <Link href="/" className="hover:text-black">Home</Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
