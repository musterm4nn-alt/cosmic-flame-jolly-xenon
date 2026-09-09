import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useXcode } from "@/lib/store";
import { formatClock } from "@/lib/utils";

export function SettingsPanel() {
  const open = useXcode((s) => s.settingsOpen);
  const setOpen = useXcode((s) => s.setSettingsOpen);
  const auth = useXcode((s) => s.auth);
  const agent = useXcode((s) => s.agent);
  const cliPath = useXcode((s) => s.cliPath);
  const setCliPath = useXcode((s) => s.setCliPath);
  const mode = useXcode((s) => s.permissionMode);
  const setMode = useXcode((s) => s.setPermissionMode);
  const signOut = useXcode((s) => s.signOut);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent title="Settings" side="right">
        <div className="space-y-6 p-4">
          <section>
            <h3 className="text-xs font-medium tracking-wide text-subtle uppercase">Account</h3>
            <p className="mt-2 text-sm text-fg">{auth?.label ?? "Signed out"}</p>
            <p className="font-mono text-xs text-muted">
              {auth
                ? `OAuth PKCE · cached_token · ${formatClock(auth.signedInAt)}`
                : "No session"}
            </p>
            <p className="mt-2 text-xs text-subtle">API key is not used and is not stored.</p>
          </section>

          <Separator />

          <section>
            <h3 className="text-xs font-medium tracking-wide text-subtle uppercase">
              Hidden process
            </h3>
            {agent ? (
              <dl className="mt-2 space-y-1 font-mono text-xs text-muted">
                <Row k="pid" v={String(agent.pid)} />
                <Row k="binary" v={agent.binary} />
                <Row k="args" v={agent.args} />
                <Row k="flags" v={agent.flags} />
                <Row k="window" v={agent.window} />
              </dl>
            ) : (
              <p className="mt-2 text-sm text-muted">Agent not running.</p>
            )}
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="text-xs font-medium tracking-wide text-subtle uppercase">CLI path</h3>
            <Input
              value={cliPath}
              onChange={(e) => setCliPath(e.target.value)}
              spellCheck={false}
              aria-label="Path to grok.exe"
            />
          </section>

          <section className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-fg">Always approve tools</p>
              <p className="text-xs text-muted">Skip ACP permission prompts</p>
            </div>
            <Switch
              checked={mode === "always"}
              onCheckedChange={(v) => setMode(v ? "always" : "ask")}
              aria-label="Always approve tools"
            />
          </section>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            <LogOut />
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-subtle">{k}</dt>
      <dd className="break-all text-fg">{v}</dd>
    </div>
  );
}
