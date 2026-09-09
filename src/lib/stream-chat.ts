export type StreamHandlers = {
  onText: (full: string) => void;
  onThought: (full: string) => void;
};

type Delta = {
  content?: string;
  reasoning_content?: string;
};

type SsePayload = {
  choices?: { delta?: Delta }[];
};

export async function streamChat(
  input: {
    messages: { role: "user" | "assistant"; content: string }[];
    cwd?: string;
    permissionMode?: "ask" | "always";
  },
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";
  let thought = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split("\n");
    buffer = parts.pop() ?? "";

    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      let payload: SsePayload;
      try {
        payload = JSON.parse(data) as SsePayload;
      } catch {
        continue;
      }
      const delta = payload.choices?.[0]?.delta;
      if (!delta) continue;
      if (delta.content) {
        text += delta.content;
        handlers.onText(text);
      }
      if (delta.reasoning_content) {
        thought += delta.reasoning_content;
        handlers.onThought(thought);
      }
    }
  }
}

export function flattenMessageText(blocks: { type: string; text?: string }[]): string {
  return blocks
    .filter((b) => b.type === "text" && b.text)
    .map((b) => b.text ?? "")
    .join("\n");
}
