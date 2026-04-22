"use client";

import AnimatedPoemContent, { ReadingProgress } from "@/components/AnimatedPoemContent";
import PoemBackdrop from "@/components/PoemBackdrop";
import type { Poem } from "@/lib/poems";

interface PoemClientProps {
  poem: Poem;
}

export default function PoemClient({ poem }: PoemClientProps) {
  const blocks = poem.content.split(/\r?\n\r?\n/);

  return (
    <>
      <ReadingProgress />
      <PoemBackdrop />
      <main className="min-h-[50vh] w-full py-24 px-8">
        <AnimatedPoemContent title={poem.title} blocks={blocks} />
      </main>
    </>
  );
}