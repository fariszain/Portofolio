import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";

import { LangToggle } from "./LangToggle";

type Props = {
  lang: Locale;
  labels: { language: string };
};

/**
 * Name and language switch at the top of the page. It scrolls away with the
 * hero instead of staying fixed, so it never sits on top of the content.
 * The footer repeats the language switch and links back to the top.
 */
export function SiteHeader({ lang, labels }: Props) {
  return (
    <header
      data-intro-item
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-(--gutter) py-4"
    >
      <p className="py-2 font-mono text-sm">{site.shortName}</p>
      <LangToggle current={lang} label={labels.language} />
    </header>
  );
}
