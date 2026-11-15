import type { Locale } from "@/i18n/config";

/**
 * Single source of truth for owner details, links and downloadable files.
 * Every fact here comes from the CVs in `public/cv/`.
 */

export const site = {
  name: "Faris Zain As-Shadiq",
  shortName: "Faris Zain",
  // TODO(faris): confirm the final Vercel URL (or custom domain) before release.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fariszain.vercel.app",
  location: "Banda Aceh, Indonesia",
  links: {
    github: "https://github.com/fariszain",
    linkedin: "https://www.linkedin.com/in/fariszainasshadiq",
  },
} as const;

/**
 * Contact details are kept in pieces and only assembled in the browser by
 * `ContactLink`, so they never appear as plain text in the static HTML.
 */
export const contact = {
  email: { user: "fariszainasshadiq", domain: "gmail.com" },
  phone: { country: "62", groups: ["851", "4223", "3633"] },
} as const;

export const buildEmail = () =>
  `${contact.email.user}@${contact.email.domain}`;

export const buildPhoneDisplay = () =>
  `+${contact.phone.country} ${contact.phone.groups.join(" ")}`;

export const buildWhatsAppUrl = () =>
  `https://wa.me/${contact.phone.country}${contact.phone.groups.join("")}`;

export type CvTrack = "web" | "ml";

/** CV files in `public/cv/`, matched to the language and track of each PDF. */
export const cvFiles: Record<Locale, Record<CvTrack, string>> = {
  en: {
    web: "/cv/Faris-Zain-CV-EN-Web.pdf",
    ml: "/cv/Faris-Zain-CV-EN-ML.pdf",
  },
  id: {
    web: "/cv/Faris-Zain-CV-ID-Web.pdf",
    ml: "/cv/Faris-Zain-CV-ID-ML.pdf",
  },
};
