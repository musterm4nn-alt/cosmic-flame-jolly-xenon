import { useActiveSession, useXcode } from "@/lib/store";

export function StatusBar() {
  const agent = useXcode((s) => s.agent);
  const auth = useXcode((s) => s.auth);
  const model = useXcode((s) => s.model);
  const mode = useXcode((s) => s.permissionMode);
  const session = useActiveSession();

  return (
    <footer className="px-3 pb-2.5">
      <div className="glass-chip flex h-8 items-center gap-3 overflow-hidden rounded-full px-3 font-mono text-micro text-subtle">
        <span className="flex items-center gap-1.5 text-ok">
          <span className="size-1.5 rounded-full bg-ok" />
          {agent ? `hidden pid ${agent.pid}` : "no agent"}
        </span>
        <span className="hidden sm:inline">{auth ? "oauth · no api key" : "signed out"}</span>
        <span className="hidden truncate md:inline">{session?.cwd}</span>
        <span className="ml-auto truncate">
          {model} · {mode === "always" ? "always-approve" : "ask"}
        </span>
      </div>
    </footer>
  );
}
