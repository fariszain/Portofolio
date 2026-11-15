"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { MEDIA } from "@/lib/motion";

/** Session flag: the title-card intro plays once per browser session. */
const INTRO_KEY = "fz-intro-seen";

// GSAP cannot tween `var(--token)` colours, so these mirror globals.css.
const RED = "#e11d2e";
const LINE = "#262626";

type Props = {
  name: string;
  tagline: string;
  location: string;
  scrollLabel: string;
  /** The <Portrait /> element, rendered on the server and passed in. */
  portrait: ReactNode;
};

/**
 * Editorial title card in three layers: a red block at the back, the name
 * set huge on two lines across it, and the portrait figure in front.
 *
 * On the first visit of a session a thin red light sweeps across the name,
 * a rule draws underneath, then the rest of the screen arrives. Afterwards
 * the same red light follows the pointer.
 *
 * The <h1> is visible from the first frame (it is the LCP element); only
 * the elements marked `data-intro-item` wait for the intro.
 */
export function Hero({ name, tagline, location, scrollLabel, portrait }: Props) {
  const root = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  // "Faris Zain" -> one word per line.
  const [firstLine, ...rest] = name.trim().split(/\s+/);
  const secondLine = rest.join(" ");

  useGSAP(
    () => {
      const section = root.current;
      const title = nameRef.current;
      const rule = ruleRef.current;
      if (!section || !title || !rule) return;

      const html = document.documentElement;
      // The header lives outside this section. GSAP scopes selector strings
      // to `root`, so query the document directly.
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-intro-item]"));

      // --- Title-card intro -------------------------------------------------
      let seen = true;
      try {
        seen = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {
        // Storage blocked: skip the intro rather than replay it on every load.
      }
      const reduced = window.matchMedia(MEDIA.reduced).matches;

      const cursorLight = { "--lw": "17vw", "--lh": "17vw" };
      let intro: gsap.core.Timeline | null = null;
      const skip = () => intro?.progress(1);
      const skipEvents = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
      const removeSkip = () =>
        skipEvents.forEach((type) => window.removeEventListener(type, skip));

      if (seen || reduced) {
        html.setAttribute("data-intro", "done");
        gsap.set(title, cursorLight);
      } else {
        // Re-apply the attribute the inline script set: React's dev-mode
        // remount strips attributes it does not manage from <html>.
        html.setAttribute("data-intro", "play");

        // The light is positioned in pixels from the name's top-left corner.
        const box = title.getBoundingClientRect();

        intro = gsap.timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem(INTRO_KEY, "1");
            } catch {
              // Nothing to do: the intro simply replays next time.
            }
            html.setAttribute("data-intro", "done");
            gsap.set(items, { clearProps: "opacity" });
            gsap.set(rule, { clearProps: "transform,backgroundColor" });
            gsap.set(title, { ...cursorLight, "--lo": 0 });
            removeSkip();
          },
        });

        intro
          .set(items, { opacity: 0 })
          .set(title, { "--lw": "9vw", "--lh": "2.6em", "--ly": `${box.height / 2}px`, "--lo": 1 })
          .fromTo(
            title,
            { "--lx": `${box.width * -0.15}px` },
            { "--lx": `${box.width * 1.15}px`, duration: 1.05, ease: "power2.inOut" },
            0.1,
          )
          .fromTo(
            rule,
            { scaleX: 0, backgroundColor: RED },
            { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
            0.2,
          )
          .to(rule, { backgroundColor: LINE, duration: 0.5 }, 1.1)
          .to(items, { opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.05 }, 1.0);

        // Any input ends the intro at once: it never holds the visitor.
        skipEvents.forEach((type) =>
          window.addEventListener(type, skip, { once: true, passive: true }),
        );
      }

      // --- Red light that follows the pointer -------------------------------
      const mm = gsap.matchMedia();
      mm.add(MEDIA.pointerMotion, () => {
        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          if (html.getAttribute("data-intro") === "play") return;
          const rect = title.getBoundingClientRect();
          gsap.to(title, {
            "--lx": `${event.clientX - rect.left}px`,
            "--ly": `${event.clientY - rect.top}px`,
            "--lo": 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          if (html.getAttribute("data-intro") === "play") return;
          gsap.to(title, { "--lo": 0, duration: 0.5, overwrite: "auto" });
        };

        section.addEventListener("pointermove", onMove);
        section.addEventListener("pointerleave", onLeave);
        return () => {
          section.removeEventListener("pointermove", onMove);
          section.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => {
        removeSkip();
        mm.revert();
        gsap.set(items, { clearProps: "opacity" });
        gsap.set(rule, { clearProps: "transform,backgroundColor" });
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="hero relative flex min-h-svh flex-col justify-end overflow-clip px-(--gutter) pb-8 pt-20 sm:pb-10"
    >
      <div className="hero-stage">
        {/* Everything inside is sized in ems of the name, so the name and
            the portrait keep the same overlap at every viewport size. */}
        <div className="hero-composition">
          <p data-intro-item className="hero-location font-mono text-muted">
            {location}
          </p>

          <h1 ref={nameRef} className="hero-name font-display uppercase">
            <span data-text={firstLine}>{firstLine}</span>{" "}
            <span data-text={secondLine}>{secondLine}</span>
          </h1>

          {/* Part of the title card, so it does not wait for the intro. It
              must not get opacity or a transform: that would flatten its
              layers, and the red block has to stay behind the name. */}
          <div className="hero-portrait">{portrait}</div>
        </div>
      </div>

      <div ref={ruleRef} aria-hidden="true" className="hero-rule mt-6 h-px origin-left bg-line" />

      <div className="mt-6 flex items-end justify-between gap-8">
        <p data-intro-item className="max-w-[22ch] text-2xl leading-[1.15] tracking-tight sm:text-3xl">
          {tagline}
        </p>
        <p data-intro-item className="scroll-cue shrink-0 font-mono text-sm text-muted">
          [{scrollLabel}]
        </p>
      </div>
    </section>
  );
}
