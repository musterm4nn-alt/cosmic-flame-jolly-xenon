import { useRef, useState } from "react";
import { Folder, PanelLeft, Settings } from "lucide-react";
import { Composer } from "@/components/composer";
import { PermissionDialog } from "@/components/permission-dialog";
import { SettingsPanel } from "@/components/settings-panel";
import { Sidebar } from "@/components/sidebar";
import { StatusBar } from "@/components/status-bar";
import { Transcript } from "@/components/transcript";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { WindowFrame } from "@/components/window-frame";
import { flattenMessageText, streamChat } from "@/lib/stream-chat";
import { useActiveSession, useXcode } from "@/lib/store";

export function AppShell() {
  const session = useActiveSession();
  const agent = useXcode((s) => s.agent);
  const streaming = useXcode((s) => s.streaming);
  const permissionMode = useXcode((s) => s.permissionMode);
  const folderGranted = useXcode((s) => s.folderGranted);
  const sidebarOpen = useXcode((s) => s.sidebarOpen);
  const setSidebarOpen = useXcode((s) => s.setSidebarOpen);
  const setSettingsOpen = useXcode((s) => s.setSettingsOpen);
  const setCwd = useXcode((s) => s.setCwd);
  const setStreaming = useXcode((s) => s.setStreaming);
  const appendUser = useXcode((s) => s.appendUser);
  const startAssistant = useXcode((s) => s.startAssistant);
  const patchAssistant = useXcode((s) => s.patchAssistant);
  const failAssistant = useXcode((s) => s.failAssistant);
  const [mobileNav, setMobileNav] = useState(false);
  const [permOpen, setPermOpen] = useState(false);
  const pendingPrompt = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function send(text: string) {
    if (permissionMode === "ask" && !folderGranted) {
      pendingPrompt.current = text;
      setPermOpen(true);
      return;
    }
    await runTurn(text);
  }

  async function runTurn(text: string) {
    const { sessionId } = appendUser(text);
    const snap = useXcode.getState().sessions.find((s) => s.id === sessionId);
    const history =
      snap?.messages
        .filter((m) => m.blocks.some((b) => b.type === "text"))
        .map((m) => ({
          role: m.role,
          content: flattenMessageText(m.blocks),
        }))
        .filter((m) => m.content.trim())
        .slice(-12) ?? [];

    const assistantId = startAssistant(sessionId);
    setStreaming(true);
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      await streamChat(
        {
          messages: history,
          cwd: snap?.cwd,
          permissionMode: useXcode.getState().permissionMode,
        },
        {
          onText: (full) => patchAssistant(sessionId, assistantId, { text: full }),
          onThought: (full) => patchAssistant(sessionId, assistantId, { thought: full }),
        },
        ac.signal,
      );
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      failAssistant(
        sessionId,
        assistantId,
        err instanceof Error ? err.message : "The agent did not respond.",
      );
    } finally {
      setStreaming(false);
    }
  }

  return (
    <TooltipProvider>
      <WindowFrame
        subtitle={
          agent ? `grok agent stdio · hidden pid ${agent.pid}` : "grok agent stdio · not running"
        }
      >
        <div className="flex min-h-0 flex-1 gap-2 p-2">
          <aside
            className={`hidden w-60 shrink-0 md:flex ${sidebarOpen ? "" : "md:hidden"}`}
          >
            <div className="glass-panel flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg">
              <Sidebar />
            </div>
          </aside>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-12 shrink-0 items-center gap-2 px-1.5">
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Sessions"
                onClick={() => setMobileNav(true)}
              >
                <PanelLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="hidden md:inline-flex"
                aria-label="Toggle sessions"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <PanelLeft />
              </Button>
              <Folder className="size-4 shrink-0 text-subtle" />
              <Input
                value={session?.cwd ?? ""}
                onChange={(e) => setCwd(e.target.value)}
                aria-label="Working directory"
                spellCheck={false}
                className="h-9 border-0 bg-transparent px-1 font-mono text-xs shadow-none"
              />
              <Tooltip content="Settings">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Settings"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings />
                </Button>
              </Tooltip>
            </div>
            <Transcript onStarter={send} />
            <Composer disabled={streaming} onSend={send} />
          </div>
        </div>
        <StatusBar />
        <SettingsPanel />
        <PermissionDialog
          open={permOpen}
          onOpenChange={setPermOpen}
          onAllow={() => {
            const t = pendingPrompt.current;
            pendingPrompt.current = null;
            if (t) void runTurn(t);
          }}
        />
        <Sheet open={mobileNav} onOpenChange={setMobileNav}>
          <SheetContent title="Sessions" side="left">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </WindowFrame>
    </TooltipProvider>
  );
}
