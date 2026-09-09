import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function inlineFormat(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code key={i} className="rounded-xs bg-surface-3 px-1 py-0.5 font-mono text-xs text-fg">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-medium text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const chunks = text.split(/```(\w*)\n([\s\S]*?)```/g);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < chunks.length; i += 3) {
    const prose = chunks[i] ?? "";
    const lang = chunks[i + 1];
    const code = chunks[i + 2];

    if (prose) {
      const paras = prose.split(/\n{2,}/);
      for (const [pi, para] of paras.entries()) {
        const lines = para.split("\n");
        const isList = lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l) || l.trim() === "");
        if (isList && lines.some((l) => l.trim())) {
          nodes.push(
            <ul key={`p-${i}-${pi}`} className="my-2 space-y-1 pl-4 text-sm leading-relaxed text-fg">
              {lines
                .filter((l) => l.trim())
                .map((l, li) => (
                  <li key={li} className="list-disc">
                    {inlineFormat(l.replace(/^\s*([-*]|\d+\.)\s+/, ""))}
                  </li>
                ))}
            </ul>,
          );
        } else if (para.trim()) {
          nodes.push(
            <p key={`p-${i}-${pi}`} className="my-2 text-sm leading-relaxed text-fg">
              {inlineFormat(para)}
            </p>,
          );
        }
      }
    }

    if (code !== undefined) {
      nodes.push(
        <pre
          key={`c-${i}`}
          className="my-3 overflow-x-auto rounded-sm border border-border bg-desktop p-3 font-mono text-xs leading-relaxed text-fg"
          data-lang={lang || undefined}
        >
          <code>{code.replace(/\n$/, "")}</code>
        </pre>,
      );
    }
  }

  return <div className={cn("min-w-0", className)}>{nodes}</div>;
}
