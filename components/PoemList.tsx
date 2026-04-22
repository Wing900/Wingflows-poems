"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Poem } from "@/lib/poems";
import getRelativeTime from "@/util/date";
import Backdrop from "./Backdrop";

export default function PoemList({ poems }: { poems: Poem[] }) {
  return (
    <div className="w-full">
      <Backdrop />
      <div className="container mx-auto flex max-w-lg flex-col items-center justify-center px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 w-full text-6xl font-black text-black dark:text-white"
        >
          Poems
        </motion.h2>
        <nav className="w-full space-y-4 text-xl">
          {poems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/${poem.routeSlug}`}
                className="flex w-full flex-row items-center justify-between rounded border border-zinc-300 bg-white py-2 px-3 transition-all duration-300 hover:bg-zinc-50 hover:pl-6 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 dark:hover:pl-6"
              >
                <span className="text-zinc-900 dark:text-zinc-50">
                  {poem.title}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {getRelativeTime(poem.writtenAt)}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </div>
  );
}
