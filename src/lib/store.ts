import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_BINARY,
  DEFAULT_CWD,
  DEFAULT_MODEL,
  type AgentProcess,
  type AuthRecord,
  type ChatMessage,
  type PermissionMode,
  type Session,
  type SetupPhase,
} from "@/lib/types";
import { uid } from "@/lib/utils";

function newSession(cwd: string): Session {
  const now = Date.now();
  return {
    id: uid("ses"),
    title: "New session",
    cwd,
    messages: [],
    createdAt: now,
    updatedAt: now,
  };
}

function titleFromPrompt(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return "New session";
  return t.length > 42 ? `${t.slice(0, 42)}…` : t;
}

type XcodeState = {
  setupPhase: SetupPhase;
  auth: AuthRecord | null;
  agent: AgentProcess | null;
  cliPath: string;
  model: string;
  permissionMode: PermissionMode;
  folderGranted: boolean;
  sidebarOpen: boolean;
  settingsOpen: boolean;
  sessions: Session[];
  activeId: string | null;
  streaming: boolean;

  setSetupPhase: (p: SetupPhase) => void;
  completeOAuth: () => void;
  spawnAgent: () => void;
  signOut: () => void;
  setCliPath: (p: string) => void;
  setModel: (m: string) => void;
  setPermissionMode: (m: PermissionMode) => void;
  setFolderGranted: (v: boolean) => void;
  setSidebarOpen: (v: boolean) => void;
  setSettingsOpen: (v: boolean) => void;
  newChat: () => string;
  selectSession: (id: string) => void;
  deleteSession: (id: string) => void;
  setCwd: (cwd: string) => void;
  setStreaming: (v: boolean) => void;
  appendUser: (text: string) => { sessionId: string; message: ChatMessage };
  startAssistant: (sessionId: string) => string;
  patchAssistant: (
    sessionId: string,
    messageId: string,
    patch: {
      text?: string;
      thought?: string;
    },
  ) => void;
  failAssistant: (sessionId: string, messageId: string, error: string) => void;
};

const first = newSession(DEFAULT_CWD);

export const useXcode = create<XcodeState>()(
  persist(
    (set, get) => ({
      setupPhase: "welcome",
      auth: null,
      agent: null,
      cliPath: DEFAULT_BINARY,
      model: DEFAULT_MODEL,
      permissionMode: "ask",
      folderGranted: false,
      sidebarOpen: true,
      settingsOpen: false,
      sessions: [first],
      activeId: first.id,
      streaming: false,

      setSetupPhase: (p) => set({ setupPhase: p }),

      completeOAuth: () =>
        set({
          auth: {
            signedIn: true,
            label: "xAI account",
            method: "oauth-pkce",
            signedInAt: Date.now(),
          },
        }),

      spawnAgent: () => {
        const pid = 4000 + Math.floor(Math.random() * 5000);
        set({
          agent: {
            pid,
            binary: get().cliPath,
            args: "agent stdio --no-auto-update",
            flags: "CREATE_NO_WINDOW (0x08000000)",
            window: "hidden",
          },
          setupPhase: "ready",
        });
      },

      signOut: () => {
        const ses = newSession(DEFAULT_CWD);
        set({
          setupPhase: "welcome",
          auth: null,
          agent: null,
          folderGranted: false,
          settingsOpen: false,
          streaming: false,
          sessions: [ses],
          activeId: ses.id,
        });
      },

      setCliPath: (p) => set({ cliPath: p }),
      setModel: (m) => set({ model: m }),
      setPermissionMode: (m) => set({ permissionMode: m }),
      setFolderGranted: (v) => set({ folderGranted: v }),
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      setSettingsOpen: (v) => set({ settingsOpen: v }),

      newChat: () => {
        const cwd = get().sessions.find((s) => s.id === get().activeId)?.cwd ?? DEFAULT_CWD;
        const ses = newSession(cwd);
        set((s) => ({
          sessions: [ses, ...s.sessions],
          activeId: ses.id,
        }));
        return ses.id;
      },

      selectSession: (id) => set({ activeId: id }),

      deleteSession: (id) =>
        set((s) => {
          const next = s.sessions.filter((x) => x.id !== id);
          const fallback = next[0] ?? newSession(DEFAULT_CWD);
          const sessions = next.length ? next : [fallback];
          return {
            sessions,
            activeId: s.activeId === id ? sessions[0].id : s.activeId,
          };
        }),

      setCwd: (cwd) =>
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === s.activeId ? { ...ses, cwd, updatedAt: Date.now() } : ses,
          ),
        })),

      setStreaming: (v) => set({ streaming: v }),

      appendUser: (text) => {
        const state = get();
        let sessionId = state.activeId;
        let sessions = state.sessions;
        if (!sessionId || !sessions.some((s) => s.id === sessionId)) {
          const ses = newSession(DEFAULT_CWD);
          sessions = [ses, ...sessions];
          sessionId = ses.id;
        }
        const message: ChatMessage = {
          id: uid("msg"),
          role: "user",
          blocks: [{ type: "text", text }],
          createdAt: Date.now(),
        };
        sessions = sessions.map((ses) => {
          if (ses.id !== sessionId) return ses;
          const titled = ses.messages.length === 0 ? titleFromPrompt(text) : ses.title;
          return {
            ...ses,
            title: titled,
            messages: [...ses.messages, message],
            updatedAt: Date.now(),
          };
        });
        set({ sessions, activeId: sessionId });
        return { sessionId, message };
      },

      startAssistant: (sessionId) => {
        const id = uid("msg");
        const message: ChatMessage = {
          id,
          role: "assistant",
          blocks: [],
          createdAt: Date.now(),
        };
        set((s) => ({
          sessions: s.sessions.map((ses) =>
            ses.id === sessionId
              ? { ...ses, messages: [...ses.messages, message], updatedAt: Date.now() }
              : ses,
          ),
        }));
        return id;
      },

      patchAssistant: (sessionId, messageId, patch) =>
        set((s) => ({
          sessions: s.sessions.map((ses) => {
            if (ses.id !== sessionId) return ses;
            return {
              ...ses,
              updatedAt: Date.now(),
              messages: ses.messages.map((m) => {
                if (m.id !== messageId) return m;
                const blocks = [...m.blocks];
                if (patch.thought !== undefined) {
                  const i = blocks.findIndex((b) => b.type === "thought");
                  if (i >= 0 && blocks[i].type === "thought") {
                    blocks[i] = { type: "thought", text: patch.thought };
                  } else {
                    blocks.unshift({ type: "thought", text: patch.thought });
                  }
                }
                if (patch.text !== undefined) {
                  const i = blocks.findIndex((b) => b.type === "text");
                  if (i >= 0 && blocks[i].type === "text") {
                    blocks[i] = { type: "text", text: patch.text };
                  } else {
                    blocks.push({ type: "text", text: patch.text });
                  }
                }
                return { ...m, blocks };
              }),
            };
          }),
        })),

      failAssistant: (sessionId, messageId, error) =>
        set((s) => ({
          sessions: s.sessions.map((ses) => {
            if (ses.id !== sessionId) return ses;
            return {
              ...ses,
              messages: ses.messages.map((m) =>
                m.id === messageId
                  ? {
                      ...m,
                      blocks: [{ type: "text", text: error }],
                    }
                  : m,
              ),
            };
          }),
        })),
    }),
    {
      name: "x-code",
      partialize: (s) => ({
        setupPhase: s.setupPhase,
        auth: s.auth,
        agent: s.agent,
        cliPath: s.cliPath,
        model: s.model,
        permissionMode: s.permissionMode,
        folderGranted: s.folderGranted,
        sessions: s.sessions.slice(0, 24),
        activeId: s.activeId,
      }),
    },
  ),
);

export function useActiveSession(): Session | undefined {
  return useXcode((s) => s.sessions.find((x) => x.id === s.activeId) ?? s.sessions[0]);
}
