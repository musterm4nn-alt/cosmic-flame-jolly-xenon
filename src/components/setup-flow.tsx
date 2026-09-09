import { useState, type ReactNode } from "react";
import { Check, EyeOff, FolderSearch, KeyRound, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XcodeMark } from "@/components/mark";
import { WindowFrame } from "@/components/window-frame";
import { useXcode } from "@/lib/store";
import { DEFAULT_BINARY } from "@/lib/types";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "welcome", label: "Welcome" },
  { id: "cli", label: "Grok CLI" },
  { id: "oauth", label: "OAuth" },
  { id: "agent", label: "Hidden agent" },
] as const;

function Card({ children }: { children: ReactNode }) {
  return <div className="glass-panel rounded-lg p-5 sm:p-6">{children}</div>;
}

export function SetupFlow() {
  const phase = useXcode((s) => s.setupPhase);
  return (
    <WindowFrame subtitle="first run · no API key">
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8 sm:px-8">
        <ol className="mb-8 flex w-full max-w-lg gap-2">
          {STEPS.map((s, i) => {
            const activeIndex = STEPS.findIndex((x) => x.id === phase);
            const done = activeIndex > i || phase === "ready";
            const current = s.id === phase;
            return (
              <li key={s.id} className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span
                  className={cn(
                    "h-1 rounded-full",
                    done || current ? "bg-accent" : "bg-lift",
                  )}
                />
                <span
                  className={cn(
                    "truncate font-mono text-micro uppercase tracking-wider",
                    current ? "text-fg" : "text-subtle",
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="w-full max-w-lg xcode-enter">
          {phase === "welcome" && <Welcome />}
          {phase === "cli" && <CliStep />}
          {phase === "oauth" && <OAuthStep />}
          {phase === "agent" && <AgentStep />}
        </div>
      </div>
    </WindowFrame>
  );
}

function Welcome() {
  const next = useXcode((s) => s.setSetupPhase);
  return (
    <Card>
      <XcodeMark className="mb-4 size-11" />
      <h1 className="text-2xl font-medium tracking-tight">x-code</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        A Windows frontend for the official Grok CLI. Sign in with your xAI account. No API key.
        The agent runs hidden — no console window.
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        <Fact icon={<Shield className="size-4" />} title="OAuth, not keys">
          Browser PKCE against auth.x.ai. Tokens live in ~/.grok/auth.json.
        </Fact>
        <Fact icon={<EyeOff className="size-4" />} title="No console">
          grok agent stdio is spawned with CREATE_NO_WINDOW and piped ACP.
        </Fact>
        <Fact icon={<FolderSearch className="size-4" />} title="The CLI stays the brain">
          Sessions, tools, and models stay in the official grok binary.
        </Fact>
      </ul>
      <Button className="mt-6 w-full" onClick={() => next("cli")}>
        Continue
      </Button>
    </Card>
  );
}

function Fact({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="glass-chip mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-muted">
        {icon}
      </span>
      <span>
        <span className="block font-medium text-fg">{title}</span>
        <span className="text-muted">{children}</span>
      </span>
    </li>
  );
}

function CliStep() {
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState(false);
  const next = useXcode((s) => s.setSetupPhase);

  function scan() {
    setScanning(true);
    window.setTimeout(() => {
      setScanning(false);
      setFound(true);
    }, 1100);
  }

  return (
    <Card>
      <h2 className="text-xl font-medium tracking-tight">Locate Grok CLI</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        x-code talks to the official <span className="font-mono text-fg">grok</span> binary. It
        will not open a terminal to do that.
      </p>
      <div className="glass-well mt-5 rounded-md p-3 font-mono text-xs text-muted">
        <p>PATH</p>
        <p>%USERPROFILE%\.grok\bin</p>
        {found ? (
          <p className="mt-2 flex items-center gap-2 text-ok">
            <Check className="size-3.5" /> {DEFAULT_BINARY}
          </p>
        ) : (
          <p className="mt-2 text-subtle">not scanned</p>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="sm:flex-1" onClick={scan} disabled={scanning || found}>
          {scanning ? <Loader2 className="animate-spin" /> : <FolderSearch />}
          {scanning ? "Scanning" : found ? "Found" : "Scan for grok.exe"}
        </Button>
        <Button className="sm:flex-1" disabled={!found} onClick={() => next("oauth")}>
          Continue
        </Button>
      </div>
    </Card>
  );
}

function OAuthStep() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const complete = useXcode((s) => s.completeOAuth);
  const next = useXcode((s) => s.setSetupPhase);

  function start() {
    setBusy(true);
    setStatus("Opening system browser · PKCE verifier issued");
    window.setTimeout(() => setStatus("Waiting on http://127.0.0.1/callback"), 700);
    window.setTimeout(() => setStatus("Writing tokens to ~/.grok/auth.json"), 1500);
    window.setTimeout(() => {
      complete();
      setBusy(false);
      setStatus("Authenticated · method cached_token");
    }, 2200);
  }

  const signed = Boolean(status) && !busy;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-medium tracking-tight">Sign in with xAI</h2>
        <Badge>OAuth 2.0 PKCE</Badge>
      </div>
      <p className="text-sm leading-relaxed text-muted">
        Use your SuperGrok or X Premium+ account. x-code never asks for an API key and never
        stores one. The official CLI owns the client and refresh cycle.
      </p>
      <div className="glass-well mt-5 rounded-md p-4">
        <p className="font-mono text-micro uppercase tracking-wider text-subtle">accounts.x.ai</p>
        <p className="mt-1 text-sm text-fg">x-code wants to use Grok on this machine</p>
        <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
          <li>redirect · loopback PKCE</li>
          <li>scope · grok-cli</li>
          <li>secret · none (public client)</li>
        </ul>
        {status ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-fg">
            {busy ? (
              <Loader2 className="size-4 animate-spin text-muted" />
            ) : (
              <Check className="size-4 text-ok" />
            )}
            {status}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button className="sm:flex-1" onClick={start} disabled={busy || signed}>
          {busy ? <Loader2 className="animate-spin" /> : <KeyRound />}
          {busy ? "Waiting for callback" : signed ? "Signed in" : "Continue with xAI"}
        </Button>
        <Button className="sm:flex-1" variant="outline" disabled={!signed} onClick={() => next("agent")}>
          Continue
        </Button>
      </div>
    </Card>
  );
}

function AgentStep() {
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const spawn = useXcode((s) => s.spawnAgent);

  function run() {
    setBusy(true);
    const lines = [
      "CreateProcess · dwCreationFlags = 0x08000000",
      "stdin / stdout / stderr → pipes",
      "grok agent stdio --no-auto-update",
      "ACP initialize · authenticate cached_token",
      "Window: none",
    ];
    lines.forEach((line, i) => {
      window.setTimeout(() => setLog((l) => [...l, line]), 280 * (i + 1));
    });
    window.setTimeout(() => {
      spawn();
    }, 280 * (lines.length + 1) + 200);
  }

  return (
    <Card>
      <h2 className="text-xl font-medium tracking-tight">Start hidden agent</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        One long-lived process. No cmd.exe, no PowerShell window, no ConPTY. If a console flashes,
        that is a bug.
      </p>
      <div className="glass-well mt-5 min-h-32 rounded-md p-3 font-mono text-xs leading-relaxed text-muted">
        {log.length === 0 ? <p className="text-subtle">ready to spawn</p> : null}
        {log.map((l) => (
          <p key={l} className="text-fg">
            {l}
          </p>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={run} disabled={busy}>
        {busy ? <Loader2 className="animate-spin" /> : <EyeOff />}
        {busy ? "Spawning" : "Spawn grok agent stdio"}
      </Button>
    </Card>
  );
}
