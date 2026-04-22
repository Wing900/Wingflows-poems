"use client";

import dynamic from "next/dynamic";

const AnimatedPoemContent = dynamic(() => import("./AnimatedPoemContent").then(m => m.default), { ssr: false });
const ReadingProgress = dynamic(() => import("./AnimatedPoemContent").then(m => m.ReadingProgress), { ssr: false });
const PoemBackdrop = dynamic(() => import("./PoemBackdrop").then(m => m.default), { ssr: false });

interface PoemClientProps {
  title: string;
  blocks: string[];
}

export default function PoemClient({ title, blocks }: PoemClientProps) {
  return (
    <>
      <ReadingProgress />
      <PoemBackdrop />
      <main className="min-h-[50vh] w-full py-24 px-8">
        <AnimatedPoemContent title={title} blocks={blocks} />
      </main>
    </>
  );
}