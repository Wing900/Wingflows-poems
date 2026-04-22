"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

export default function AuthorImage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.set((event.clientX / window.innerWidth - 0.5) * 8);
      y.set((event.clientY / window.innerHeight - 0.5) * 8);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  const translateX = useTransform(
    x,
    (value) => `${Math.min(Math.max(value, -6), 6)}px`,
  );
  const translateY = useTransform(
    y,
    (value) => `${Math.min(Math.max(value, -6), 6)}px`,
  );

  return (
    <motion.div
      className="max-w-sm"
      style={{
        translateX,
        translateY,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
        mass: 0.8,
      }}
    >
      <div className="aspect-[4/5] border-8 border-zinc-800 bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300 p-8 grayscale transition-all duration-500 hover:grayscale-0 dark:border-zinc-300 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-700">
        <div className="flex h-full flex-col justify-between border border-zinc-700/30 p-6 dark:border-zinc-100/20">
          <span className="text-sm uppercase tracking-[0.35em] text-zinc-600 dark:text-zinc-400">
            Wingflow
          </span>
          <div className="space-y-3">
            <div className="text-8xl font-semibold leading-none text-zinc-900 dark:text-zinc-100">
              W
            </div>
            <p className="max-w-[12rem] text-base leading-7 text-zinc-700 dark:text-zinc-300">
              What remains after the draft is still a poem.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
