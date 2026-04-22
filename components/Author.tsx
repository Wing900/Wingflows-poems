import AuthorImage from "./AuthorImage";

export default function Author() {
  return (
    <section className="flex flex-row-reverse flex-wrap-reverse items-center justify-center gap-10 px-8 py-20">
      <AuthorImage />
      <main className="flex w-sm flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          The Poet
        </h2>
        <span className="text-5xl text-zinc-900 dark:text-white sm:text-7xl">
          Wingflow
        </span>
        <p className="max-w-prose text-lg text-zinc-800 dark:text-zinc-300">
          Remember, we still have poetry. Some poems arrive refined, some keep
          their earlier weather, but all of them remain part of the same voice.
          This archive keeps both.
        </p>
      </main>
    </section>
  );
}
