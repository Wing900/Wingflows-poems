import Link from "next/link";
import { cn } from "@/util/css";

export default function Navbar() {
  const items = [
    {
      name: "GitHub",
      href: "https://github.com/Wing900/Wingflows-poems",
      external: true,
      desktopOnly: false,
    },
    {
      name: "Home",
      href: "/",
      external: false,
      desktopOnly: true,
    },
  ];

  return (
    <header className="flex min-h-[10vh] w-screen flex-row items-center justify-between gap-8 border-b border-zinc-200 bg-white py-4 px-8 dark:border-zinc-800 dark:bg-zinc-950">
      <Link
        href="/"
        className="text-xl font-semibold text-zinc-800 transition-colors hover:text-zinc-950 hover:underline dark:text-zinc-300 dark:hover:text-white sm:text-3xl"
      >
        <span className="hidden md:block">Wingflow</span>
        <span className="md:hidden">Home</span>
      </Link>
      <nav className="flex flex-row items-center justify-end space-x-8 sm:justify-start">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            className={cn(
              item.desktopOnly ? "hidden md:block" : "",
              "text-zinc-800 transition-colors hover:text-zinc-950 hover:underline dark:text-zinc-300 dark:hover:text-white sm:text-xl",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
