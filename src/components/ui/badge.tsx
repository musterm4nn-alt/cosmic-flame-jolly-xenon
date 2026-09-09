import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "ok" | "warn" | "accent";
  children: ReactNode;
}) {
  const tones = {
    muted: "text-muted glass-chip",
    ok: "text-ok bg-ok/15",
    warn: "text-warn bg-warn/15",
    accent: "text-accent-fg bg-accent",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-2xs tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
