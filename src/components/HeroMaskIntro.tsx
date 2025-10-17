"use client";

import { motion, useMotionValue, useSpring, useTransform, vh } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function HeroMaskIntro() {
  // Mouse parallax values
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 75, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 75, damping: 30 });
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["1%", "-1%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["1%", "-1%"]);

  useEffect(() => {
    // only enable parallax on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background with animated mask reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
        animate={{
          clipPath: [
            "polygon(55% 40%, 65% 50%, 45% 75%, 35% 60%)",
            "polygon(10% 5%, 95% 10%, 90% 95%, 5% 90%)",
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ],
          opacity: [0, 1, 1],
          scale: [1, 1, 1.1]
        }}
        transition={{ duration: 2.5, 
          ease: "easeOut", 
          times: [0, 0.3, 1], 
          delay: 1.2 }}
        style={{ x: isMobile ? 0 : bgX, y: isMobile ? 0 : bgY }}
      >
        <Image
          src="/hero-wedding.jpg"
          alt="The Tor Photography"
          fill
          priority
          className="object-cover brightness-40"
        />
      </motion.div>

      {/* Title Layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative flex items-center justify-center">
          {/* “The” */}
          <motion.h1
            className="font-playfair font-semibold absolute right-full text-white text-4xl text-shadow-md 
            md:text-7xl uppercase opacity-0"
            animate={{
              opacity: [0, 0.3, 1],
              y: ["10vh", "0vh", "0vh"],
              x: ["-20vw", "-20vw", "-5vw"],
            }}
            transition={{ duration: 2, ease: "easeInOut", times: [0, 0.5, 1], }}
          >
            The
          </motion.h1>

          {/* “Tor” */}
          <motion.h1
            className="text-white font-playfair text-5xl text-shadow-md font-semibold uppercase tracking-wide opacity-0 pr-0.5
            md:text-8xl md:pr-0"
            animate={{
              opacity: [0, 0.3, 1],
              y: ["-5vh", "2vh", "0vh"],
              x: ["-2vw"],
            }}
            transition={{ duration: 2, ease: "easeInOut", times: [0, 0.5, 1], }}
          >
            Tor
          </motion.h1>

          {/* “Photos” */}
          <motion.h1
            className="absolute left-full text-white text-3xl text-shadow-md 
            md:text-6xl font-playfair font-semibold uppercase opacity-0"
            animate={{
              opacity: [0, 0.3, 1],
              y: ["10vh", "0vh", "0vh"],
              x: ["15vw", "15vw", "-0.5vw"],
            }}
            transition={{ duration: 2, ease: "easeInOut", times: [0, 0.5, 1], }}
          >
            Photos
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-playfair text-shadow-md tracking-wider absolute bottom-top w-full text-center text-white/95 
          md:text-2xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 90 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
          Capturing Your Love Story With Elegance
        </motion.p>
      </div>

      Scroll Arrow
      <motion.div className="absolute bottom-8 w-full flex justify-center z-10 opacity-0"
      animate={{opacity:[0,1]}}
      transition={{duration: 1, delay: 2, ease: "easeOut"}}>
        <span className="animate-bounce [animation-duration:1.5s] text-white text-2xl">↓</span>
      </motion.div>
    </div>
  );
}
