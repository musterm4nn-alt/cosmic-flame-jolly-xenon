import { useEffect, useRef } from "react";
import { ChevronRight, Loader2, Wrench } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { useActiveSession, useXcode } from "@/lib/store";
import type { ChatMessage, MessageBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

const STARTERS = [
  "Explain this project like I just cloned it.",
  "How does OAuth in the Grok CLI work?",
  "Draft a CREATE_NO_WINDOW spawn for grok agent stdio.",
];

export function Transcript({ onStarter }: { onStarter: (text: string) => void }) {
  const session = useActiveSession();
  const streaming = useXcode((s) => s.streaming);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [session?.messages, streaming]);

  const messages = session?.messages ?? [];
  const last = messages[messages.length - 1];
  const showThinking = streaming && last?.role === "assistant" && last.blocks.length === 0;

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10">
        <p className="text-lg font-medium tracking-tight">Ready when you are</p>
        <p className="mt-1 max-w-sm text-center text-sm text-muted">
          Hidden ACP session on grok-4.5. Ask anything — coding first.
        </p>
        <div className="mt-6 grid w-full max-w-lg gap-2">
          {STARTERS.map((s) => (
            <Button
              key={s}
              variant="outline"
              className="h-auto justify-start rounded-xl py-3 text-left font-normal whitespace-normal"
              onClick={() => onStarter(s)}
            >
              <ChevronRight className="mt-0.5 shrink-0 text-subtle" />
              {s}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <ol className="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6">
        {messages.map((m) => (
          <li key={m.id}>
            <MessageRow message={m} />
          </li>
        ))}
        {showThinking ? (
          <li className="text-sm">
            <span className="xcode-shimmer font-medium">Grok is thinking</span>
          </li>
        ) : null}
        <div ref={endRef} />
      </ol>
    </div>
  );
}

function MessageRow({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    const text = message.blocks.find((b) => b.type === "text");
    return (
      <div className="flex justify-end">
        <div className="glass-chip max-w-xl rounded-xl rounded-br-sm px-3.5 py-2 text-sm leading-relaxed text-fg">
          {text && text.type === "text" ? text.text : ""}
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <p className="mb-1 font-mono text-micro tracking-wider text-subtle uppercase">Grok</p>
      <div className="space-y-2">
        {message.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: MessageBlock }) {
  if (block.type === "thought") {
    return (
      <details className="glass-well rounded-lg px-3 py-2">
        <summary className="cursor-pointer text-xs text-muted">Thinking</summary>
        <p className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-subtle">
          {block.text}
        </p>
      </details>
    );
  }
  if (block.type === "tool") {
    return (
      <div className={cn("glass-chip flex items-start gap-2 rounded-lg px-3 py-2 text-xs")}>
        {block.status === "running" ? (
          <Loader2 className="mt-0.5 size-3.5 animate-spin text-muted" />
        ) : (
          <Wrench className="mt-0.5 size-3.5 text-muted" />
        )}
        <div>
          <p className="font-mono text-fg">{block.name}</p>
          <p className="text-muted">{block.detail}</p>
        </div>
      </div>
    );
  }
  return <Markdown text={block.text} />;
}
