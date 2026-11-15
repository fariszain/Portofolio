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

export function Portrait({
  alt,
  className,
  preload = false,
  sizes = "(min-width: 1024px) 34vw, 82vw",
}: Props) {
  const hasCutout = existsSync(path.join(process.cwd(), "public", CUTOUT_SRC));

  return (
    <figure className={cn("relative isolate aspect-[4/5] w-full", className)}>
      {/* Red accent block behind the figure, drawn in CSS so it stays flexible. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -z-10 bg-red",
          hasCutout ? "inset-x-[12%] bottom-0 top-[18%]" : "inset-0 translate-x-3 translate-y-3",
        )}
      />

      {hasCutout ? (
        <Image
          src={CUTOUT_SRC}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-contain object-bottom grayscale contrast-110"
        />
      ) : (
        // TODO(faris): temporary. Uses the original studio photo until
        // public/img/faris-cutout.png exists. Cropped to hide the chairs.
        <span className="absolute inset-0 overflow-hidden bg-text">
          <Image
            src={placeholder}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            className="origin-[45%_30%] scale-125 object-cover object-top mix-blend-multiply grayscale contrast-110"
          />
        </span>
      )}
    </figure>
  );
}
