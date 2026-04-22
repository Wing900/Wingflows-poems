import Link from "next/link";
import type { Poem } from "@/lib/poems";

export default function PoemGroups({
  groups,
}: {
  groups: Array<{ category: string; poems: Poem[] }>;
}) {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="paper rounded-[2rem] p-8 shadow-[0_24px_80px_rgba(48,34,25,0.08)] sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Archive
        </p>
        <h1 className="max-w-2xl text-5xl leading-tight sm:text-7xl">
          Poems that stayed.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
          A handwritten archive in digital form, separated by the way these poems first arrived.
        </p>
      </div>
      <aside className="paper flex rounded-[2rem] p-8 shadow-[0_24px_80px_rgba(48,34,25,0.08)] sm:p-10">
        <div className="my-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
            The Poet
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Wingflow</h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-[var(--muted)]">
            Some poems arrive polished. Some arrive with their seams still showing. Both are worth keeping.
          </p>
        </div>
      </aside>

      <div className="lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <section key={group.category} className="paper rounded-[2rem] p-8 sm:p-10">
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
                    Collection
                  </p>
                  <h2 className="mt-2 text-3xl">{group.category}</h2>
                </div>
                <span className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm text-[var(--accent)]">
                  {group.poems.length} poems
                </span>
              </div>
              <nav className="space-y-4">
                {group.poems.map((poem) => (
                  <Link
                    key={poem.id}
                    href={`/poems/${poem.slug.map(encodeURIComponent).join("/")}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-4 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_16px_40px_rgba(70,45,31,0.08)]"
                  >
                    <span className="text-xl">{poem.title}</span>
                    <span className="text-sm uppercase tracking-[0.18em] text-[var(--muted)] transition group-hover:text-[var(--accent)]">
                      Read
                    </span>
                  </Link>
                ))}
              </nav>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
