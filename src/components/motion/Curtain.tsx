"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type Props = {
  /** ScrollTrigger start, relative to the parent section. */
  start?: string;
};

/**
 * A red curtain that sweeps across the first screen of its parent section
 * once, when that section scrolls in. Reserved for Work and Contact.
 *
 * Place it as a direct child of a `relative` section. It never blocks
 * scrolling: the sweep is a 0.65 s time-based tween, not a scrubbed one.
 * With reduced motion the section fades in briefly instead.
 */
export function Curtain({ start = "top 72%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    const section = el?.parentElement;
    if (!el || !section) return;

    const mm = gsap.matchMedia();

    mm.add(MEDIA.motionOk, () => {
      gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 1 });

      gsap
        .timeline({ scrollTrigger: { trigger: section, start, once: true } })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "power3.in" })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.35, ease: "power3.out" })
        .set(el, { autoAlpha: 0 });
    });

    mm.add(MEDIA.reduced, () => {
      gsap.from(section, {
        autoAlpha: 0,
        duration: 0.25,
        scrollTrigger: { trigger: section, start, once: true },
      });
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none invisible absolute inset-x-0 top-0 z-20 h-lvh bg-red"
    />
  );
}
