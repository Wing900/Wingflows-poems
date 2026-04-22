"use client";

import { useEffect, useState } from "react";

export default function PoemBackdrop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-zinc-200/20 via-zinc-300/10 to-transparent blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-zinc-300/15 via-zinc-400/10 to-transparent blur-3xl animate-pulse-glow-delayed" />
    </div>
  );
}