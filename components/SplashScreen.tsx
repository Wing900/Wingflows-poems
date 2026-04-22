"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SplashScreenProps {
  minDuration?: number;
}

export function SplashScreen({ minDuration = 2000 }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, minDuration);

    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, minDuration + 600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [minDuration, isHome]);

  if (!isHome || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-8xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Wingflow
          </motion.div>
          <motion.div
            className="mt-2 h-[2px] w-0 bg-zinc-400 dark:bg-zinc-600"
            animate={{ width: isExiting ? 0 : "100%" }}
            transition={{ delay: 0.6, duration: 0.4, ease: "easeInOut" }}
          />
          <motion.p
            className="mt-6 text-sm text-zinc-500 dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Remember, we still have poetry
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SplashScreen;