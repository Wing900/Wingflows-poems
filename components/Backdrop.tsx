"use client";

import { useEffect, useState } from "react";

export default function Backdrop() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkScreenSize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxY = isMobile ? -200 : -400;
  const translateY = Math.min(parallaxY, (scrollY / 2000) * parallaxY);
  const opacity = Math.max(0, 0.15 - (scrollY / 2000) * 0.15);
  const width = isMobile ? 180 : 280;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ opacity }}>
      <div
        className="absolute border-8 border-zinc-800 shadow-2xl dark:border-white overflow-hidden"
        style={{
          left: "10%",
          top: "60%",
          transform: `translate(-50%, ${translateY}px)`,
          width,
        }}
      >
        <img
          src="/自画像.png"
          alt=""
          className="w-full h-auto object-cover block"
          style={{ width, height: "auto" }}
        />
      </div>
    </div>
  );
}