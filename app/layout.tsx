import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Wingflow's Poems",
  description: "A quiet archive of poems by Wingflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body className="font-[var(--font-body)] text-[var(--foreground)]">
        <div className="min-h-screen">
          <SiteHeader />
          {children}
          <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 text-sm text-[var(--muted)] sm:px-8">
            <div className="paper rounded-full px-6 py-4 text-center">
              The code is open. The poems remain Wingflow&apos;s.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
