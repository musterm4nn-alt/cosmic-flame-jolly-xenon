import { useRef, type MouseEvent, type ReactNode } from "react";
import { Minus, Square, X } from "lucide-react";
import { XcodeMark } from "@/components/mark";
import { cn } from "@/lib/utils";

export function WindowFrame({
  children,
  title = "x-code",
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--lx", `${x}%`);
    el.style.setProperty("--ly", `${y}%`);
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      className="desktop-glass flex h-dvh flex-col p-0 md:p-6 lg:p-8"
    >
      <div className="desktop-orbs" aria-hidden="true" />
      <div className="desktop-grain" aria-hidden="true" />
      <div
        className={cn(
          "glass-window relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden",
          "md:rounded-window",
        )}
      >
        <header className="glass-bar flex h-12 shrink-0 items-center select-none">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
            <XcodeMark className="size-7" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium tracking-tight">{title}</p>
              {subtitle ? (
                <p className="truncate font-mono text-micro text-subtle">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="hidden h-full items-center gap-0.5 pr-1.5 sm:flex">
            <CaptionBtn label="Minimize">
              <Minus className="size-3.5" />
            </CaptionBtn>
            <CaptionBtn label="Maximize">
              <Square className="size-3" />
            </CaptionBtn>
            <CaptionBtn label="Close" danger>
              <X className="size-3.5" />
            </CaptionBtn>
          </div>
        </header>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

function CaptionBtn({
  children,
  label,
  danger,
}: {
  children: ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-11 items-center justify-center text-muted"
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-[background-color,color] duration-150",
          danger ? "hover:bg-danger hover:text-fg" : "hover:bg-lift hover:text-fg",
        )}
      >
        {children}
      </span>
    </button>
  );
}
