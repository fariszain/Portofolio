"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum pull toward the pointer, in pixels. */
  strength?: number;
};

/** Wraps a button or link so it leans slightly toward the pointer. */
export function Magnetic({ children, className, strength = 8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.pointerMotion, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const clamp = gsap.utils.clamp(-1, 1);

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = el.getBoundingClientRect();
          xTo(clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength);
          yTo(clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set(el, { x: 0, y: 0 });
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
