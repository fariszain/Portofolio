import { notFound } from "next/navigation";

import { Curtain } from "@/components/motion/Curtain";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealText } from "@/components/motion/RevealText";
import { Portrait } from "@/components/ui/Portrait";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const ensureStatic = "navigation";

// Stage 2 placeholder: a scrollable page that exercises the motion system
// (smooth scroll, text reveal, magnetic, cursor, curtain) and the portrait.
// The real sections replace this in stage 3.
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main>
      <section className="flex min-h-dvh flex-col justify-end gap-6 px-6 pb-16 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-red" aria-hidden="true">
            [00]
          </span>{" "}
          {lang}
        </p>
        <h1 className="font-display text-[clamp(4.5rem,19vw,20rem)] uppercase leading-[0.85] tracking-tight">
          {dict.hero.name}
        </h1>
        <p className="max-w-xl text-lg text-muted">{dict.hero.tagline}</p>
      </section>

      <section className="grid min-h-dvh items-center gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <Portrait alt={dict.about.portraitAlt} />
        <div className="flex flex-col items-start gap-10">
          <RevealText
            by="line"
            className="max-w-3xl text-3xl leading-tight sm:text-5xl"
          >
            {dict.meta.description}
          </RevealText>
          <Magnetic>
            <a
              href={site.links.github}
              className="inline-block border border-line px-6 py-3 font-mono text-sm uppercase tracking-[0.2em]"
            >
              GitHub
            </a>
          </Magnetic>
        </div>
      </section>

      <section className="relative flex min-h-lvh items-center overflow-clip bg-surface px-6 sm:px-10">
        <Curtain />
        <RevealText
          as="h2"
          by="char"
          className="font-display text-[clamp(3.5rem,14vw,14rem)] uppercase leading-[0.9]"
        >
          {dict.hero.name}
        </RevealText>
      </section>
    </main>
  );
}
