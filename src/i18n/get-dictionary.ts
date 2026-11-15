import "server-only";

import type { Locale } from "./config";

const loadEnglish = () =>
  import("../../messages/en.json").then((module) => module.default);

/** English is the reference shape; every other locale must match it. */
export type Dictionary = Awaited<ReturnType<typeof loadEnglish>>;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: loadEnglish,
  id: () => import("../../messages/id.json").then((module) => module.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
