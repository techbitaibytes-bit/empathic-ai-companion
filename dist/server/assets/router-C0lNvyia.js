import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-Df_aimJU.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "EmpathAI — A Safe Space That Sees You" },
			{
				name: "description",
				content: "EmpathAI is a premium AI emotional companion for teens and young adults. Mood Mirror, healing toolkit, crisis support — always private, always available."
			},
			{
				name: "author",
				content: "EmpathAI Team"
			},
			{
				property: "og:title",
				content: "EmpathAI — A Safe Space That Sees You"
			},
			{
				property: "og:description",
				content: "A private sanctuary for emotional support. Built for teens, powered by AI, grounded in safety."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@EmpathAI"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {})]
	});
}
//#endregion
//#region src/routes/sanctuary.tsx
var $$splitComponentImporter$6 = () => import("./sanctuary-BoRK5IiT.js");
var Route$7 = createFileRoute("/sanctuary")({
	beforeLoad: ({ location }) => {
		if (location.pathname === "/sanctuary" || location.pathname === "/sanctuary/") throw redirect({ to: "/sanctuary/chat" });
	},
	head: () => ({ meta: [{ title: "Sanctuary — EmpathAI" }, {
		name: "description",
		content: "Your private wellness sanctuary: AI chat, mood mirror, healing toolkit, and crisis support."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$5 = () => import("./routes-DuIgTzSV.js");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "EmpathAI — A Safe Space That Sees You" },
		{
			name: "description",
			content: "AI emotional companion for teens. Mood Mirror, healing toolkit, and crisis support. Always private, always available."
		},
		{
			property: "og:title",
			content: "EmpathAI — Soft Cyber Sanctuary"
		},
		{
			property: "og:description",
			content: "A private AI wellness sanctuary. Mood mirror, healing toolkit, and crisis support."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/sanctuary.toolkit.tsx
var $$splitComponentImporter$4 = () => import("./sanctuary.toolkit-eeFzXXIy.js");
var Route$5 = createFileRoute("/sanctuary/toolkit")({
	head: () => ({ meta: [{ title: "Healing Toolkit — EmpathAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/sanctuary.mirror.tsx
var $$splitComponentImporter$3 = () => import("./sanctuary.mirror-ZqCs1Xq4.js");
var Route$4 = createFileRoute("/sanctuary/mirror")({
	head: () => ({ meta: [{ title: "Mood Mirror — EmpathAI Sanctuary" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/sanctuary.insights.tsx
var $$splitComponentImporter$2 = () => import("./sanctuary.insights-CMI_MV2e.js");
var Route$3 = createFileRoute("/sanctuary/insights")({
	head: () => ({ meta: [{ title: "Insights — EmpathAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/sanctuary.crisis.tsx
var $$splitComponentImporter$1 = () => import("./sanctuary.crisis-DDZ-fRkV.js");
var Route$2 = createFileRoute("/sanctuary/crisis")({
	head: () => ({ meta: [{ title: "Crisis Help — EmpathAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/sanctuary.chat.tsx
var $$splitComponentImporter = () => import("./sanctuary.chat-DNlu1BPj.js");
var Route$1 = createFileRoute("/sanctuary/chat")({
	head: () => ({ meta: [{ title: "Chat — EmpathAI Sanctuary" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routes/api/chat.ts
var Route = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const apiKey = process.env.VITE_GROQ_API_KEY ?? process.env.GROQ_API_KEY;
	if (!apiKey) return new Response(JSON.stringify({ error: "Missing GROQ_API_KEY on the server." }), {
		status: 500,
		headers: { "content-type": "application/json" }
	});
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response("Invalid JSON", { status: 400 });
	}
	const { messages, systemPrompt, recentMood, userName } = body;
	if (!Array.isArray(messages) || messages.length === 0) return new Response("messages required", { status: 400 });
	const groqMessages = [{
		role: "system",
		content: systemPrompt + "\n\nIMPORTANT: You are talking to a teen or young adult (ages 13-22). Always use their name if they share it. Reference what they said earlier in the conversation. Never give generic responses. Be specific to what THIS person is feeling RIGHT NOW. If they mention school, friends, family, future — dig into THAT specific thing. Keep responses warm, brief (3-5 sentences max unless they ask for more), and human." + (userName ? `\n\nThe user's name is ${userName}. Use their name naturally 1-2 times per conversation, not every message. Never say 'I' in the first word of a sentence.` : "") + (recentMood ? `\n\nUser's current emotional state: ${recentMood}. Acknowledge this subtly in your response.` : "")
	}, ...messages.map((m) => ({
		role: m.role === "assistant" ? "assistant" : "user",
		content: m.content
	}))];
	try {
		const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: "llama-3.3-70b-versatile",
				messages: groqMessages,
				stream: true,
				max_tokens: 1024,
				temperature: .8
			})
		});
		if (!response.ok) {
			const err = await response.text();
			return new Response(JSON.stringify({ error: err }), {
				status: 502,
				headers: { "content-type": "application/json" }
			});
		}
		const stream = new ReadableStream({ async start(controller) {
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					const lines = decoder.decode(value, { stream: true }).split("\n").filter((l) => l.startsWith("data: "));
					for (const line of lines) {
						const data = line.slice(6);
						if (data === "[DONE]") continue;
						try {
							const text = JSON.parse(data).choices?.[0]?.delta?.content;
							if (text) controller.enqueue(new TextEncoder().encode(text));
						} catch {}
					}
				}
				controller.close();
			} catch (err) {
				controller.error(err);
			}
		} });
		return new Response(stream, { headers: {
			"content-type": "text/plain; charset=utf-8",
			"cache-control": "no-store"
		} });
	} catch (err) {
		const msg = err instanceof Error ? err.message : "Groq error";
		return new Response(JSON.stringify({ error: msg }), {
			status: 502,
			headers: { "content-type": "application/json" }
		});
	}
} } } });
//#endregion
//#region src/routeTree.gen.ts
var SanctuaryRoute = Route$7.update({
	id: "/sanctuary",
	path: "/sanctuary",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var SanctuaryToolkitRoute = Route$5.update({
	id: "/toolkit",
	path: "/toolkit",
	getParentRoute: () => SanctuaryRoute
});
var SanctuaryMirrorRoute = Route$4.update({
	id: "/mirror",
	path: "/mirror",
	getParentRoute: () => SanctuaryRoute
});
var SanctuaryInsightsRoute = Route$3.update({
	id: "/insights",
	path: "/insights",
	getParentRoute: () => SanctuaryRoute
});
var SanctuaryCrisisRoute = Route$2.update({
	id: "/crisis",
	path: "/crisis",
	getParentRoute: () => SanctuaryRoute
});
var SanctuaryChatRoute = Route$1.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => SanctuaryRoute
});
var ApiChatRoute = Route.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$8
});
var SanctuaryRouteChildren = {
	SanctuaryChatRoute,
	SanctuaryCrisisRoute,
	SanctuaryInsightsRoute,
	SanctuaryMirrorRoute,
	SanctuaryToolkitRoute
};
var rootRouteChildren = {
	IndexRoute,
	SanctuaryRoute: SanctuaryRoute._addFileChildren(SanctuaryRouteChildren),
	ApiChatRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
