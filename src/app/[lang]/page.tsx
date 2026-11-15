import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Marquee } from "@/components/ui/Marquee";
import { Portrait } from "@/components/ui/Portrait";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const ensureStatic = "navigation";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader lang={lang} labels={{ language: dict.nav.language }} />
      <main>
        <Hero
          name={dict.hero.name}
          tagline={dict.hero.tagline}
          location={dict.hero.location}
          scrollLabel={dict.hero.scroll}
          portrait={<Portrait alt={dict.about.portraitAlt} preload />}
        />
        <Marquee items={dict.hero.roles} />
        <About copy={dict.about} />
        <Process copy={dict.process} />
      </main>
    </>
  );
}
