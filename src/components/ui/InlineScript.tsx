"use client";

/**
 * A script that runs while the browser parses the server HTML, before first
 * paint. On the client React never executes script tags, so it is rendered
 * there as inert `text/plain`, which also avoids React's dev warning.
 * Pattern from the Next.js guide "Preventing flash before hydration".
 *
 * Only pass constant strings written in this codebase, never user input.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
