export type PermissionMode = "ask" | "always";

export type SetupPhase = "welcome" | "cli" | "oauth" | "agent" | "ready";

export type ToolStatus = "running" | "done" | "denied";

export type MessageBlock =
  | { type: "text"; text: string }
  | { type: "thought"; text: string }
  | { type: "tool"; name: string; detail: string; status: ToolStatus };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  blocks: MessageBlock[];
  createdAt: number;
};

export type Session = {
  id: string;
  title: string;
  cwd: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type AuthRecord = {
  signedIn: boolean;
  label: string;
  method: "oauth-pkce";
  signedInAt: number;
};

export type AgentProcess = {
  pid: number;
  binary: string;
  args: string;
  flags: string;
  window: "hidden";
};

export const DEFAULT_CWD = "C:\\Users\\you\\project";
export const DEFAULT_BINARY = "C:\\Users\\you\\.grok\\bin\\grok.exe";
export const DEFAULT_MODEL = "grok-4.5";
