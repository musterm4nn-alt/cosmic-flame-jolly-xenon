import { useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Composer({
  disabled,
  onSend,
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  function submit() {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) {
      ref.current.style.height = "auto";
    }
  }

  return (
    <form
      className="px-3 pb-3 sm:px-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="glass-panel mx-auto flex max-w-3xl items-end gap-2 rounded-xl p-2">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          placeholder="Message Grok"
          aria-label="Message Grok"
          className={cn(
            "max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed text-fg placeholder:text-subtle",
            "focus-visible:outline-none",
          )}
          onChange={(e) => {
            setValue(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          aria-label="Send"
          className="shrink-0"
        >
          <ArrowUp />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl px-1 font-mono text-micro text-subtle">
        Enter to send · Shift+Enter for a new line
      </p>
    </form>
  );
}
