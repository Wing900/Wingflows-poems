import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center px-8 py-24">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-zinc-300 dark:text-zinc-800 animate-fade-in">
          404
        </h1>
        <p className="mt-4 text-2xl text-zinc-600 dark:text-zinc-400 animate-slide-up">
          This poem seems to have drifted away.
        </p>
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link
            href="/"
            className="text-lg text-zinc-800 underline transition-colors hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          >
            Return to the archive
          </Link>
        </div>
      </div>
    </main>
  );
}