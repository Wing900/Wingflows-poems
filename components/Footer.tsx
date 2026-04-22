export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t border-zinc-200 bg-white p-8 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 *:text-center">
      <p>© {new Date().getFullYear()} Wingflow. All rights reserved.</p>
      <p>
        Built with Next.js and TailwindCSS. The source code is open source, the
        poems remain intellectual property.
      </p>
    </footer>
  );
}
