"use client";

import Link from "next/link";

import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Props = {
  current: Locale;
  /** Accessible name for the group, e.g. "Language". */
  label: string;
  className?: string;
};

/** Saves the choice so `proxy.ts` sends the visitor to it next time. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LangToggle({ current, label, className }: Props) {
  return (
    <nav aria-label={label} className={cn("flex items-center gap-1 font-mono text-sm", className)}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            // Keep the reader where they are; only the language changes.
            scroll={false}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            onClick={() => rememberLocale(locale)}
            className={cn(
              "px-2 py-2 uppercase underline-offset-4",
              active ? "underline" : "opacity-60 hover:opacity-100",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
