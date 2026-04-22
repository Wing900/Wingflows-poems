"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({ className = "" }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-[3px] bg-zinc-800 dark:bg-zinc-100 ${className}`}
      style={{ transform: `scaleX(${progress / 100})`, transformOrigin: "left" }}
    />
  );
}

export function AnimatedPoemContent({ title, blocks }: { title: string; blocks: string[] }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < title.length) {
          setTitleIndex(currentIndex + 1);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTitleComplete(true);
          setTimeout(() => setShowContent(true), 300);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(startTimer);
  }, [title]);

  return (
    <article className="container prose prose-zinc mx-auto md:prose-2xl dark:prose-invert animate-fade-in">
      <h1 className="mb-12">
        <span className="text-4xl font-bold md:text-6xl">{title.slice(0, titleIndex)}</span>
        {!isTitleComplete && <span className="ml-[2px] animate-blink">▋</span>}
      </h1>

      {showContent && (
        <main className="animate-slide-up">
          {blocks.map((block, blockIndex) => (
            <div
              key={`block-${blockIndex}`}
              className="mb-6 animate-fade-in"
              style={{ animationDelay: `${blockIndex * 0.15}s` }}
            >
              {block.split(/\r?\n/).map((line, lineIndex, array) => (
                <span key={`line-${blockIndex}-${lineIndex}`}>
                  {line}
                  {lineIndex !== array.length - 1 && <br />}
                </span>
              ))}
            </div>
          ))}
        </main>
      )}
    </article>
  );
}

export default AnimatedPoemContent;