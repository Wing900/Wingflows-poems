export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[rgba(245,241,232,0.78)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="/" className="text-sm uppercase tracking-[0.35em] text-[var(--muted)]">
          Wingflow
        </a>
        <p className="text-sm italic text-[var(--muted)]">
          Remember, we still have poetry.
        </p>
      </div>
    </header>
  );
}
