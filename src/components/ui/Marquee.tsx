import { Fragment } from "react";

import { cn } from "@/lib/cn";

type Props = {
  items: readonly string[];
  className?: string;
};

/**
 * One slow line of words that drifts left forever. Pure CSS: the track
 * holds the list twice and slides by half its width, so the loop is
 * seamless. With reduced motion it stays still.
 *
 * Decorative, so it is hidden from assistive technology; the same words
 * already appear in the page copy.
 */
export function Marquee({ items, className }: Props) {
  // Enough repeats to overfill wide screens before the track duplicates.
  const run = [...items, ...items, ...items];

  return (
    <div aria-hidden="true" className={cn("marquee border-y border-line", className)}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-run">
            {run.map((item, index) => (
              <Fragment key={`${copy}-${index}`}>
                <span className={index % 2 === 1 ? "marquee-outline" : undefined}>{item}</span>
                <span className="marquee-mark" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
