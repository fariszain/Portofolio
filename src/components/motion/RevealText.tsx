"use client";

import { Fragment, useRef } from "react";

import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, MEDIA } from "@/lib/motion";

type HeadingTag = "h1" | "h2" | "h3" | "h4";
type TextTag = HeadingTag | "p" | "span" | "div";

type BaseProps = {
  /** Plain text only. The component splits it into animated units. */
  children: string;
  className?: string;
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  /** Seconds between units (or between lines when `by="line"`). */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

type Props = BaseProps &
  (
    | { as?: TextTag; by?: "word" | "line" }
    // Per-letter splitting needs an accessible name on the element, which is
    // only valid on headings, so `by="char"` is limited to heading tags.
    | { as: HeadingTag; by: "char" }
  );

/**
 * Text that rises out of a mask when it scrolls into view.
 * The hidden start state is applied after hydration, so the text stays
 * readable without JavaScript. Use it for content below the first screen.
 */
export function RevealText({
  children,
  as: Tag = "p",
  by = "line",
  className,
  delay = 0,
  stagger,
  start = "top 88%",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const words = children.trim().split(/\s+/);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOk, () => {
        const units = gsap.utils.toArray<HTMLElement>("[data-reveal-unit]", el);
        if (units.length === 0) return;

        // Words that share a vertical offset sit on the same rendered line.
        const lineOf = new Map<HTMLElement, number>();
        if (by === "line") {
          const tops = [...new Set(units.map((unit) => unit.parentElement!.offsetTop))].sort(
            (a, b) => a - b,
          );
          for (const unit of units) {
            lineOf.set(unit, tops.indexOf(unit.parentElement!.offsetTop));
          }
        }

        const gap = stagger ?? (by === "line" ? 0.09 : by === "char" ? 0.025 : 0.04);

        // `y: 0` is explicit on both ends. When this effect re-runs (React
        // Strict Mode, changed props) GSAP re-reads the element's current
        // transform, and would otherwise keep the hidden offset as a pixel
        // value that never animates back to zero.
        gsap.fromTo(
          units,
          { yPercent: 115, y: 0 },
          {
            yPercent: 0,
            y: 0,
            duration: 0.95,
            ease: EASE.out,
            delay,
            stagger:
              by === "line"
                ? (_index: number, target: HTMLElement) => (lineOf.get(target) ?? 0) * gap
                : gap,
            scrollTrigger: { trigger: el, start, once: true },
          },
        );

        return () => {
          gsap.set(units, { clearProps: "transform" });
        };
      });

      mm.add(MEDIA.reduced, () => {
        gsap.from(el, {
          autoAlpha: 0,
          duration: 0.3,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [children, by, delay, stagger, start] },
  );

  const isChar = by === "char";

  return (
    <Tag
      // The union of tag names shares no single ref type.
      ref={root as never}
      className={cn("reveal", className)}
      aria-label={isChar ? children : undefined}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-mask" aria-hidden={isChar || undefined}>
            {isChar ? (
              Array.from(word).map((char, charIndex) => (
                <span key={charIndex} className="reveal-unit" data-reveal-unit>
                  {char}
                </span>
              ))
            ) : (
              <span className="reveal-unit" data-reveal-unit>
                {word}
              </span>
            )}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
