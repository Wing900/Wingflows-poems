import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import AnimatedCursor from "react-animated-cursor";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import SplashScreen from "@/components/SplashScreen";
import { cn } from "@/util/css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Wingflow's Poems",
  description:
    "Explore a collection of poems by Wingflow, arranged as a quiet public archive.",
  icons: {
    icon: "/自画像.png",
    shortcut: "/自画像.png",
    apple: "/自画像.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        `${ebGaramond.variable}`,
        "antialiased scroll-smooth",
        "bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300",
        "font-text",
      )}
      lang="en"
    >
      <body>
        <div className="hidden sm:block">
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            innerScale={1.5}
            outerScale={3}
            outerAlpha={0}
            innerStyle={{
              backgroundColor: "var(--cursor-color)",
            }}
            outerStyle={{
              border: "3px solid var(--cursor-color)",
            }}
            showSystemCursor={true}
          />
        </div>
        <SplashScreen />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
