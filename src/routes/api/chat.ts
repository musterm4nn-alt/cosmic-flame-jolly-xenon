import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8000),
      }),
    )
    .min(1)
    .max(16),
  cwd: z.string().max(400).optional(),
  permissionMode: z.enum(["ask", "always"]).optional(),
});

const SYSTEM = `You are Grok, running inside x-code — a Windows desktop frontend for the official Grok CLI over ACP (grok agent stdio). The user signed in with xAI OAuth (PKCE). There is no API key in this product. The agent process is hidden: CREATE_NO_WINDOW, piped stdio, no console window.

Be a precise coding assistant. Prefer short, concrete answers. Use fenced code when you show code. Do not ask for API keys. If asked how auth works, say OAuth against auth.x.ai, tokens in ~/.grok/auth.json, ACP authenticate with cached_token.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.XAI_API_KEY;
        if (!apiKey) {
          return Response.json(
            { error: "Grok is not available in this environment." },
            { status: 503 },
          );
        }

        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = Body.safeParse(json);
        if (!parsed.success) {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }

        const { messages, cwd, permissionMode } = parsed.data;
        const extra = [
          cwd ? `Working directory: ${cwd}` : null,
          permissionMode ? `Permission mode: ${permissionMode}` : null,
        ]
          .filter(Boolean)
          .join(". ");

        const res = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.5",
            stream: true,
            max_tokens: 1400,
            temperature: 0.5,
            messages: [
              { role: "system", content: extra ? `${SYSTEM}\n${extra}` : SYSTEM },
              ...messages,
            ],
          }),
        });

        if (!res.ok || !res.body) {
          const text = await res.text().catch(() => "");
          return Response.json(
            { error: `xAI error ${res.status}${text ? `: ${text.slice(0, 180)}` : ""}` },
            { status: 502 },
          );
        }

        return new Response(res.body, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
