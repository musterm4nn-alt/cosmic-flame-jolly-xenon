import { cn } from "@/lib/utils";

export function XcodeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-7 text-fg", className)}
    >
      <rect width="32" height="32" rx="10" className="fill-lift" />
      <rect
        x="0.7"
        y="0.7"
        width="30.6"
        height="30.6"
        rx="9.3"
        className="fill-none stroke-border-strong"
      />
      <path
        d="M9 9.5 23 22.5M23 9.5 9 22.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
