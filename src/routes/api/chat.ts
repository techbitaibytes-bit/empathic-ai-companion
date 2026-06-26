import { createFileRoute } from "@tanstack/react-router";

interface ChatBody {
  messages: { role: "user" | "assistant"; content: string }[];
  systemPrompt: string;
  recentMood?: string;
  userName?: string;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.VITE_GROQ_API_KEY ?? process.env.GROQ_API_KEY;
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "Missing GROQ_API_KEY on the server." }),
            { status: 500, headers: { "content-type": "application/json" } }
          );
        }

        let body: ChatBody;
        try {
          body = (await request.json()) as ChatBody;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const { messages, systemPrompt, recentMood, userName } = body;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("messages required", { status: 400 });
        }

        const systemContent =
          systemPrompt +
          "\n\nIMPORTANT: You are talking to a teen or young adult (ages 13-22). " +
          "Always use their name if they share it. Reference what they said earlier in the conversation. " +
          "Never give generic responses. Be specific to what THIS person is feeling RIGHT NOW. " +
          "If they mention school, friends, family, future — dig into THAT specific thing. " +
          "Keep responses warm, brief (3-5 sentences max unless they ask for more), and human." +
          (userName ? `\n\nThe user's name is ${userName}. Use their name naturally 1-2 times per conversation, not every message. Never say 'I' in the first word of a sentence.` : "") +
          (recentMood ? `\n\nUser's current emotional state: ${recentMood}. Acknowledge this subtly in your response.` : "");

        const groqMessages = [
          { role: "system", content: systemContent },
          ...messages.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.content,
          })),
        ];

        try {
          const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: groqMessages,
                stream: true,
                max_tokens: 1024,
                temperature: 0.8,
              }),
            }
          );

          if (!response.ok) {
            const err = await response.text();
            return new Response(JSON.stringify({ error: err }), {
              status: 502,
              headers: { "content-type": "application/json" },
            });
          }

          const stream = new ReadableStream({
            async start(controller) {
              const reader = response.body!.getReader();
              const decoder = new TextDecoder();
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  const chunk = decoder.decode(value, { stream: true });
                  const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
                  for (const line of lines) {
                    const data = line.slice(6);
                    if (data === "[DONE]") continue;
                    try {
                      const parsed = JSON.parse(data);
                      const text = parsed.choices?.[0]?.delta?.content;
                      if (text) controller.enqueue(new TextEncoder().encode(text));
                    } catch {}
                  }
                }
                controller.close();
              } catch (err) {
                controller.error(err);
              }
            },
          });

          return new Response(stream, {
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-store",
            },
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Groq error";
          return new Response(JSON.stringify({ error: msg }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});