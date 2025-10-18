"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TorLogo() {
  
  return (
    <Link href="/" aria-label="Tor Home">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className={`fixed top-6 left-6 text-2xl font-playfair font-semibold text-foreground z-50`}
        style={{
          letterSpacing: "0.05em",
        }}
      >
        Tor
      </motion.div>
    </Link>
  );
}
