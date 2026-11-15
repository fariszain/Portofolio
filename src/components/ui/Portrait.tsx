import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";

import { cn } from "@/lib/cn";

import placeholder from "../../../assets/source/faris-original.png";

/**
 * Final portrait: a transparent PNG with the background removed.
 * Drop the file at `public/img/faris-cutout.png` and this component picks it
 * up on the next build (or dev reload). No code change needed.
 */
const CUTOUT_SRC = "/img/faris-cutout.png";

type Props = {
  alt: string;
  className?: string;
  /** Set on the one portrait that is visible on first load. */
  preload?: boolean;
  sizes?: string;
};

/**
 * Black-and-white figure in front of a red block.
 *
 * The two are separate layers (`portrait-block`, `portrait-figure`) and the
 * component creates no stacking context of its own, so a parent can slide
 * other content between them: the hero puts the giant name there.
 *
 * The block covers the lower 86% of the frame. With the cutout, the head
 * rises above it. Until the cutout exists, the original studio photo is
 * multiplied onto the block: its white backdrop turns red, which gives the
 * same figure-on-red composition inside a clean rectangular slot.
 */
export function Portrait({
  alt,
  className,
  preload = false,
  sizes = "(min-width: 64rem) 40vw, 64vw",
}: Props) {
  const hasCutout = existsSync(path.join(process.cwd(), "public", CUTOUT_SRC));

  return (
    <figure className={cn("relative aspect-[4/5]", className)}>
      <span
        aria-hidden="true"
        className="portrait-block absolute inset-x-0 bottom-0 top-[14%] bg-red"
      />

      {hasCutout ? (
        <span className="portrait-figure absolute inset-0">
          <Image
            src={CUTOUT_SRC}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className="object-contain object-bottom grayscale contrast-110"
          />
        </span>
      ) : (
        // TODO(faris): temporary slot. Uses the original studio photo until
        // public/img/faris-cutout.png exists. Cropped to hide the chairs.
        <span className="portrait-block absolute inset-x-0 bottom-0 top-[14%] overflow-hidden">
          <Image
            src={placeholder}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className="origin-[43%_50%] scale-[1.75] object-cover object-top mix-blend-multiply brightness-125 contrast-110 grayscale"
          />
        </span>
      )}
    </figure>
  );
}
