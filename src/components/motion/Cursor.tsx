"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

const INTERACTIVE = "a, button, [data-cursor='grow']";

/**
 * A small red dot that trails the pointer and grows over links and buttons.
 * Decorative only: the native cursor stays, and the dot never mounts its
 * behaviour on touch devices or when reduced motion is requested.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = dot.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(MEDIA.pointerMotion, () => {
      // x/y are explicit so a re-run never inherits a stale pixel offset.
      gsap.set(el, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, autoAlpha: 0 });

      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let visible = false;

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        if (!visible) {
          visible = true;
          gsap.set(el, { x: event.clientX, y: event.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
        }
        xTo(event.clientX);
        yTo(event.clientY);
      };

      const onOver = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        const grow = Boolean(target?.closest(INTERACTIVE));
        gsap.to(el, {
          scale: grow ? 2.6 : 1,
          opacity: grow ? 0.55 : 1,
          duration: 0.25,
          overwrite: "auto",
        });
      };

      const onLeave = () => {
        visible = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        gsap.set(el, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none invisible fixed left-0 top-0 z-[100] size-2.5 rounded-full bg-red"
    />
  );
}
