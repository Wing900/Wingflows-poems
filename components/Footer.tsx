"use client";

import { motion } from "motion/react";

const poetQuotes = [
  "What remains after the draft is still a poem.",
  "Some poems arrive refined, some keep their earlier weather.",
  "We write to taste life twice.",
  "The soul should always stand ajar, ready to welcome the exquisite hour.",
  "Poetry is not a turning loose of emotion, but an escape from emotion.",
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t border-zinc-200 bg-white p-8 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 *:text-center">
      <motion.p
        className="max-w-md text-sm italic text-zinc-500 dark:text-zinc-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        key={new Date().getFullYear()}
      >
        {poetQuotes[new Date().getMonth() % poetQuotes.length]}
      </motion.p>
      <p>© {new Date().getFullYear()} Wingflow. All rights reserved.</p>
      <p>
        Built with Next.js and TailwindCSS. The source code is open source, the
        poems remain intellectual property.
      </p>
    </footer>
  );
}
