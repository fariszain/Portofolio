import { useSyncExternalStore } from "react";

/** Media queries that gate every animation in the site. */
export const MEDIA = {
  /** Visitor asked for less motion: no intro, parallax or curtain. */
  reduced: "(prefers-reduced-motion: reduce)",
  motionOk: "(prefers-reduced-motion: no-preference)",
  /** Mouse or trackpad. Cursor and magnetic effects stay off for touch. */
  finePointer: "(hover: hover) and (pointer: fine)",
  /** Fine pointer and motion allowed. */
  pointerMotion:
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

export const EASE = {
  out: "power4.out",
  inOut: "power3.inOut",
} as const;

/** Subscribes to a media query. Always `false` during server rendering. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
