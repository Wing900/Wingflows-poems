import Link from "next/link";
import type { Poem } from "@/lib/poems";
import getRelativeTime from "@/util/date";
import Backdrop from "./Backdrop";

export default function PoemList({ poems }: { poems: Poem[] }) {
  return (
    <div className="w-full">
      <Backdrop poemsCount={poems.length} />
      <div className="container mx-auto flex max-w-lg flex-col items-center justify-center px-8 py-12">
        <h2 className="mb-8 w-full text-6xl font-black text-black dark:text-white">
          Poems
        </h2>
        <nav className="w-full space-y-4 text-xl">
          {poems.map((poem) => (
            <Link
              key={poem.id}
              href={`/${encodeURIComponent(poem.permalink)}`}
              className="flex w-full flex-row items-center justify-between rounded border border-zinc-300 bg-white py-2 px-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              <span className="text-zinc-900 dark:text-zinc-50">
                {poem.title}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {getRelativeTime(poem.writtenAt)}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
