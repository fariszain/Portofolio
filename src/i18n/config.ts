export const locales = ["en", "id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that stores the visitor's explicit language choice. */
export const LOCALE_COOKIE = "lang";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Picks a locale from an Accept-Language header.
 * Indonesian when the most preferred language is `id*`, English otherwise.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return { tag: tag.toLowerCase(), weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter((entry) => entry.tag && entry.tag !== "*")
    .sort((a, b) => b.weight - a.weight)[0];

  if (!preferred) return defaultLocale;

  // "in" is the legacy ISO 639 code some browsers still send for Indonesian.
  return /^(id|in)(-|$)/.test(preferred.tag) ? "id" : defaultLocale;
}
