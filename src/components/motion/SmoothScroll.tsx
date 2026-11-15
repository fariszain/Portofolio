"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MEDIA, useMediaQuery } from "@/lib/motion";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/**
 * Ref to the active Lenis instance. `current` is null when smooth scrolling
 * is off (reduced motion), so callers fall back to native scrolling.
 */
export function useLenis(): RefObject<Lenis | null> {
  const ref = useContext(LenisContext);
  if (!ref) throw new Error("useLenis must be used inside <SmoothScroll>");
  return ref;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useMediaQuery(MEDIA.reduced);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenisRef.current = lenis;

    // One clock for everything: GSAP's ticker drives Lenis, and every Lenis
    // scroll event updates ScrollTrigger, so the two never drift apart.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    // Web fonts change text height, which moves every trigger position.
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <LenisContext value={lenisRef}>{children}</LenisContext>;
}
