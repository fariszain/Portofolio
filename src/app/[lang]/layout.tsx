import type { Metadata, Viewport } from "next";
import { Anton, IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";

import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { InlineScript } from "@/components/ui/InlineScript";
import { site } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import "../globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * Runs before first paint. Marks the document so CSS can hold the hero in
 * its title-card state when the intro is about to play: first visit of the
 * session and no reduced-motion preference. Keep the key in sync with
 * INTRO_KEY in `components/sections/Hero.tsx`.
 */
const introScript = `(function(){try{if(!sessionStorage.getItem("fz-intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-intro","play")}catch(e){}})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${anton.variable} ${interTight.variable} ${plexMono.variable} antialiased`}
      // The inline script adds `data-intro` before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={introScript} />
      </head>
      <body className="min-h-dvh">
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
