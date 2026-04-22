"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BackgroundImage1 from "@/assets/portrait-sketch.svg";
import BackgroundImage2 from "@/assets/book-sketch.svg";
import BackgroundImage3 from "@/assets/moon-bridge-sketch.svg";

export default function Backdrop({ poemsCount = 10 }: { poemsCount: number }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkDarkMode = () => {
      setIsDarkMode(
        document.documentElement.classList.contains("dark") ||
          (!document.documentElement.classList.contains("light") &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
    };

    checkScreenSize();
    checkDarkMode();

    window.addEventListener("resize", checkScreenSize);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkDarkMode);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      mediaQuery.removeEventListener("change", checkDarkMode);
    };
  }, []);

  const images = [BackgroundImage1, BackgroundImage2, BackgroundImage3];

  const imageConfigs = [
    {
      desktop: { left: "13%", top: "14%", width: 260 },
      mobile: { left: "18%", top: "16%", width: 165 },
      parallaxSpeed: 0.3,
    },
    {
      desktop: { left: "80%", top: "28%", width: 210 },
      mobile: { left: "83%", top: "32%", width: 132 },
      parallaxSpeed: 0.5,
    },
    {
      desktop: { left: "73%", top: "73%", width: 250 },
      mobile: { left: "76%", top: "77%", width: 155 },
      parallaxSpeed: 0.7,
    },
  ];

  const { scrollY } = useScroll();

  const parallaxMultiplier = isMobile ? -400 : -800;
  const scrollRange = isMobile ? 1500 : 2000;

  const parallax1 = useTransform(
    scrollY,
    [0, scrollRange],
    [isMobile ? 50 : 100, parallaxMultiplier * imageConfigs[0].parallaxSpeed],
  );
  const parallax2 = useTransform(
    scrollY,
    [0, scrollRange],
    [isMobile ? -25 : -50, parallaxMultiplier * imageConfigs[1].parallaxSpeed],
  );
  const parallax3 = useTransform(
    scrollY,
    [0, scrollRange],
    [0, parallaxMultiplier * imageConfigs[2].parallaxSpeed],
  );
  const itemHeight = isMobile ? 70 : 50;
  const padding = isMobile ? 150 : 100;
  const estimatedContentHeight = poemsCount * itemHeight + padding;
  const fadeStart = Math.max(isMobile ? 300 : 400, estimatedContentHeight * 0.6);
  const fadeEnd = Math.max(isMobile ? 600 : 800, estimatedContentHeight * 0.9);

  const maxOpacity = isDarkMode ? 0.15 : 0.4;
  const backdropOpacity = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    [maxOpacity, 0],
  );

  const parallaxTransforms = [parallax1, parallax2, parallax3];

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-y-visible scale-70 sm:scale-80 lg:scale-100"
      style={{
        opacity: backdropOpacity,
      }}
    >
      {imageConfigs.map((config, index) => {
        const activeConfig = isMobile ? config.mobile : config.desktop;
        return (
          <motion.div
            key={images[index % images.length].src}
            style={{
              y: parallaxTransforms[index],
              left: activeConfig.left,
              top: activeConfig.top,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute"
          >
            <Image
              src={images[index % images.length]}
              alt=""
              className={`object-cover border-4 ${isMobile ? "sm:border-6" : "border-8"} border-zinc-800 shadow-2xl dark:border-white`}
              width={activeConfig.width}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
