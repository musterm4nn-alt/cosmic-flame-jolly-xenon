import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useXcode } from "@/lib/store";
import { cn, formatDay } from "@/lib/utils";

export function Sidebar() {
  const sessions = useXcode((s) => s.sessions);
  const activeId = useXcode((s) => s.activeId);
  const select = useXcode((s) => s.selectSession);
  const create = useXcode((s) => s.newChat);
  const remove = useXcode((s) => s.deleteSession);
  const streaming = useXcode((s) => s.streaming);

  return (
    <nav className="flex h-full min-h-0 flex-col">
      <div className="p-2.5">
        <Button
          variant="secondary"
          className="w-full justify-start"
          onClick={() => create()}
          disabled={streaming}
        >
          <Plus />
          New session
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {sessions.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-subtle">No sessions yet</p>
        ) : (
          <ul className="space-y-1">
            {sessions.map((ses) => {
              const active = ses.id === activeId;
              return (
                <li key={ses.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => select(ses.id)}
                    className={cn(
                      "flex w-full items-start gap-2 rounded-lg px-2.5 py-2 pr-10 text-left transition-colors duration-150",
                      active ? "glass-chip text-fg" : "text-muted hover:bg-lift hover:text-fg",
                    )}
                  >
                    <MessageSquare className="mt-0.5 size-4 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{ses.title}</span>
                      <span className="block font-mono text-micro text-subtle">
                        {formatDay(ses.updatedAt)}
                      </span>
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${ses.title}`}
                    onClick={() => remove(ses.id)}
                    className={cn(
                      "absolute top-1.5 right-1 flex size-8 items-center justify-center rounded-full text-subtle",
                      "opacity-100 hover:bg-lift hover:text-danger md:opacity-0 md:group-hover:opacity-100",
                    )}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </nav>
  );
}
