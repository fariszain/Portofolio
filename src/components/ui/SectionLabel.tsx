import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Props = {
  /** Section number shown as `[01]`. */
  index: number;
  children: ReactNode;
  /** Use "p" when the section has its own, larger heading. */
  as?: "h2" | "p";
  className?: string;
};

export function SectionLabel({ index, children, as: Tag = "h2", className }: Props) {
  return (
    <Tag className={cn("font-mono text-sm font-normal text-muted", className)}>
      <span className="text-red-soft">[{String(index).padStart(2, "0")}]</span> {children}
    </Tag>
  );
}
