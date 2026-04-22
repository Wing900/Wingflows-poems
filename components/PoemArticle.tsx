import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import type { Poem } from "@/lib/poems";

export default function PoemArticle({ poem }: { poem: Poem }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
      <div className="paper rounded-[2rem] p-8 shadow-[0_24px_80px_rgba(48,34,25,0.08)] sm:p-12">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.3em] text-[var(--muted)] transition hover:text-[var(--accent)]"
        >
          Back
        </Link>
        <div className="mt-8 border-b border-[var(--border)] pb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            {poem.category}
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl">{poem.title}</h1>
          {poem.sourceFile ? (
            <p className="mt-5 text-base text-[var(--muted)]">
              Source: {poem.sourceFile}
            </p>
          ) : null}
        </div>
        <div className="poem-copy mt-10 text-xl leading-[2.1] text-[var(--foreground)] sm:text-2xl">
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>{poem.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
