import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as FolderLock, a as Square, b as Check, c as Plus, d as MessageSquare, f as LogOut, g as FolderSearch, h as Folder, i as Trash2, l as PanelLeft, m as KeyRound, n as Wrench, o as Shield, p as LoaderCircle, s as Settings, t as X, u as Minus, v as EyeOff, x as ArrowUp, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, h as Slot, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Baz-G_MG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function formatClock(ts) {
	return new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit"
	}).format(ts);
}
function formatDay(ts) {
	const d = new Date(ts);
	const now = /* @__PURE__ */ new Date();
	if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()) return formatClock(ts);
	return new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric"
	}).format(d);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,box-shadow,transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg shadow-[inset_0_1px_0_rgb(255_255_255_/_0.85),0_1px_2px_rgb(0_0_0_/_0.28)] hover:bg-accent-hover",
			secondary: "glass-chip text-fg hover:bg-lift",
			ghost: "text-muted hover:bg-lift hover:text-fg",
			outline: "glass-chip text-fg hover:bg-lift",
			danger: "text-danger hover:bg-danger/15"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3.5",
			lg: "h-12 px-6",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Composer({ disabled, onSend }) {
	const [value, setValue] = (0, import_react.useState)("");
	const ref = (0, import_react.useRef)(null);
	function submit() {
		const text = value.trim();
		if (!text || disabled) return;
		onSend(text);
		setValue("");
		if (ref.current) ref.current.style.height = "auto";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "px-3 pb-3 sm:px-4",
		onSubmit: (e) => {
			e.preventDefault();
			submit();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-panel mx-auto flex max-w-3xl items-end gap-2 rounded-xl p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref,
				rows: 1,
				value,
				disabled,
				placeholder: "Message Grok",
				"aria-label": "Message Grok",
				className: cn("max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm leading-relaxed text-fg placeholder:text-subtle", "focus-visible:outline-none"),
				onChange: (e) => {
					setValue(e.target.value);
					const el = e.target;
					el.style.height = "auto";
					el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
				},
				onKeyDown: (e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						submit();
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "icon",
				disabled: disabled || !value.trim(),
				"aria-label": "Send",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-3xl px-1 font-mono text-micro text-subtle",
			children: "Enter to send · Shift+Enter for a new line"
		})]
	});
}
var Dialog = Dialog$1;
function DialogContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-desktop/45 backdrop-blur-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("glass-panel rounded-xl p-5", className),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base font-medium tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				})]
			}), children]
		})
	})] });
}
var DEFAULT_CWD = "C:\\Users\\you\\project";
var DEFAULT_BINARY = "C:\\Users\\you\\.grok\\bin\\grok.exe";
var DEFAULT_MODEL = "grok-4.5";
function newSession(cwd) {
	const now = Date.now();
	return {
		id: uid("ses"),
		title: "New session",
		cwd,
		messages: [],
		createdAt: now,
		updatedAt: now
	};
}
function titleFromPrompt(text) {
	const t = text.replace(/\s+/g, " ").trim();
	if (!t) return "New session";
	return t.length > 42 ? `${t.slice(0, 42)}…` : t;
}
var first = newSession(DEFAULT_CWD);
var useXcode = create()(persist((set, get) => ({
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
	completeOAuth: () => set({ auth: {
		signedIn: true,
		label: "xAI account",
		method: "oauth-pkce",
		signedInAt: Date.now()
	} }),
	spawnAgent: () => {
		set({
			agent: {
				pid: 4e3 + Math.floor(Math.random() * 5e3),
				binary: get().cliPath,
				args: "agent stdio --no-auto-update",
				flags: "CREATE_NO_WINDOW (0x08000000)",
				window: "hidden"
			},
			setupPhase: "ready"
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
			activeId: ses.id
		});
	},
	setCliPath: (p) => set({ cliPath: p }),
	setModel: (m) => set({ model: m }),
	setPermissionMode: (m) => set({ permissionMode: m }),
	setFolderGranted: (v) => set({ folderGranted: v }),
	setSidebarOpen: (v) => set({ sidebarOpen: v }),
	setSettingsOpen: (v) => set({ settingsOpen: v }),
	newChat: () => {
		const ses = newSession(get().sessions.find((s) => s.id === get().activeId)?.cwd ?? "C:\\Users\\you\\project");
		set((s) => ({
			sessions: [ses, ...s.sessions],
			activeId: ses.id
		}));
		return ses.id;
	},
	selectSession: (id) => set({ activeId: id }),
	deleteSession: (id) => set((s) => {
		const next = s.sessions.filter((x) => x.id !== id);
		const fallback = next[0] ?? newSession("C:\\Users\\you\\project");
		const sessions = next.length ? next : [fallback];
		return {
			sessions,
			activeId: s.activeId === id ? sessions[0].id : s.activeId
		};
	}),
	setCwd: (cwd) => set((s) => ({ sessions: s.sessions.map((ses) => ses.id === s.activeId ? {
		...ses,
		cwd,
		updatedAt: Date.now()
	} : ses) })),
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
		const message = {
			id: uid("msg"),
			role: "user",
			blocks: [{
				type: "text",
				text
			}],
			createdAt: Date.now()
		};
		sessions = sessions.map((ses) => {
			if (ses.id !== sessionId) return ses;
			const titled = ses.messages.length === 0 ? titleFromPrompt(text) : ses.title;
			return {
				...ses,
				title: titled,
				messages: [...ses.messages, message],
				updatedAt: Date.now()
			};
		});
		set({
			sessions,
			activeId: sessionId
		});
		return {
			sessionId,
			message
		};
	},
	startAssistant: (sessionId) => {
		const id = uid("msg");
		const message = {
			id,
			role: "assistant",
			blocks: [],
			createdAt: Date.now()
		};
		set((s) => ({ sessions: s.sessions.map((ses) => ses.id === sessionId ? {
			...ses,
			messages: [...ses.messages, message],
			updatedAt: Date.now()
		} : ses) }));
		return id;
	},
	patchAssistant: (sessionId, messageId, patch) => set((s) => ({ sessions: s.sessions.map((ses) => {
		if (ses.id !== sessionId) return ses;
		return {
			...ses,
			updatedAt: Date.now(),
			messages: ses.messages.map((m) => {
				if (m.id !== messageId) return m;
				const blocks = [...m.blocks];
				if (patch.thought !== void 0) {
					const i = blocks.findIndex((b) => b.type === "thought");
					if (i >= 0 && blocks[i].type === "thought") blocks[i] = {
						type: "thought",
						text: patch.thought
					};
					else blocks.unshift({
						type: "thought",
						text: patch.thought
					});
				}
				if (patch.text !== void 0) {
					const i = blocks.findIndex((b) => b.type === "text");
					if (i >= 0 && blocks[i].type === "text") blocks[i] = {
						type: "text",
						text: patch.text
					};
					else blocks.push({
						type: "text",
						text: patch.text
					});
				}
				return {
					...m,
					blocks
				};
			})
		};
	}) })),
	failAssistant: (sessionId, messageId, error) => set((s) => ({ sessions: s.sessions.map((ses) => {
		if (ses.id !== sessionId) return ses;
		return {
			...ses,
			messages: ses.messages.map((m) => m.id === messageId ? {
				...m,
				blocks: [{
					type: "text",
					text: error
				}]
			} : m)
		};
	}) }))
}), {
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
		activeId: s.activeId
	})
}));
function useActiveSession() {
	return useXcode((s) => s.sessions.find((x) => x.id === s.activeId) ?? s.sessions[0]);
}
function PermissionDialog({ open, onOpenChange, onAllow }) {
	const session = useActiveSession();
	const setGranted = useXcode((s) => s.setFolderGranted);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			title: "Agent permission",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "glass-chip flex size-10 shrink-0 items-center justify-center rounded-full text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderLock, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-fg",
						children: "Grok wants to read and edit files in this working directory."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "glass-well mt-2 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted",
						children: session?.cwd
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: "This is the ACP request_permission surface. Always-approve skips it."
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Deny"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setGranted(true);
						onOpenChange(false);
						onAllow();
					},
					children: "Allow this folder"
				})]
			})]
		})
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-full glass-well px-4 text-sm text-fg placeholder:text-subtle", "transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:opacity-40", className),
		...props
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-7 w-11 shrink-0 items-center rounded-full glass-chip transition-colors", "data-[state=checked]:bg-accent", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 translate-x-1 rounded-full bg-fg shadow-[inset_0_1px_0_rgb(255_255_255_/_0.7)] transition-transform", "data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg") })
	});
}
function Separator({ className, vertical }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn(vertical ? "h-full w-px bg-border" : "h-px w-full bg-border", className)
	});
}
var Sheet = Dialog$1;
function SheetContent({ className, children, title, side = "left" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-desktop/45 backdrop-blur-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("glass-panel fixed inset-y-3 z-50 flex w-full max-w-xs flex-col overflow-hidden rounded-xl", side === "left" ? "left-3" : "right-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-12 items-center justify-between px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-sm font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto",
			children
		})]
	})] });
}
function SettingsPanel() {
	const open = useXcode((s) => s.settingsOpen);
	const setOpen = useXcode((s) => s.setSettingsOpen);
	const auth = useXcode((s) => s.auth);
	const agent = useXcode((s) => s.agent);
	const cliPath = useXcode((s) => s.cliPath);
	const setCliPath = useXcode((s) => s.setCliPath);
	const mode = useXcode((s) => s.permissionMode);
	const setMode = useXcode((s) => s.setPermissionMode);
	const signOut = useXcode((s) => s.signOut);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: "Settings",
			side: "right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-subtle uppercase",
							children: "Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-fg",
							children: auth?.label ?? "Signed out"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted",
							children: auth ? `OAuth PKCE · cached_token · ${formatClock(auth.signedInAt)}` : "No session"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-subtle",
							children: "API key is not used and is not stored."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-medium tracking-wide text-subtle uppercase",
						children: "Hidden process"
					}), agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2 space-y-1 font-mono text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "pid",
								v: String(agent.pid)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "binary",
								v: agent.binary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "args",
								v: agent.args
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "flags",
								v: agent.flags
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "window",
								v: agent.window
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Agent not running."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-medium tracking-wide text-subtle uppercase",
							children: "CLI path"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: cliPath,
							onChange: (e) => setCliPath(e.target.value),
							spellCheck: false,
							"aria-label": "Path to grok.exe"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: "Always approve tools"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Skip ACP permission prompts"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: mode === "always",
							onCheckedChange: (v) => setMode(v ? "always" : "ask"),
							"aria-label": "Always approve tools"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: () => {
							setOpen(false);
							signOut();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), "Sign out"]
					})
				]
			})
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "break-all text-fg",
			children: v
		})]
	});
}
function Sidebar() {
	const sessions = useXcode((s) => s.sessions);
	const activeId = useXcode((s) => s.activeId);
	const select = useXcode((s) => s.selectSession);
	const create = useXcode((s) => s.newChat);
	const remove = useXcode((s) => s.deleteSession);
	const streaming = useXcode((s) => s.streaming);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-2.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				className: "w-full justify-start",
				onClick: () => create(),
				disabled: streaming,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "New session"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-2 pb-3",
			children: sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-6 text-center text-xs text-subtle",
				children: "No sessions yet"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: sessions.map((ses) => {
					const active = ses.id === activeId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "group relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => select(ses.id),
							className: cn("flex w-full items-start gap-2 rounded-lg px-2.5 py-2 pr-10 text-left transition-colors duration-150", active ? "glass-chip text-fg" : "text-muted hover:bg-lift hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm",
									children: ses.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-mono text-micro text-subtle",
									children: formatDay(ses.updatedAt)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Delete ${ses.title}`,
							onClick: () => remove(ses.id),
							className: cn("absolute top-1.5 right-1 flex size-8 items-center justify-center rounded-full text-subtle", "opacity-100 hover:bg-lift hover:text-danger md:opacity-0 md:group-hover:opacity-100"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})]
					}, ses.id);
				})
			})
		})]
	});
}
function StatusBar() {
	const agent = useXcode((s) => s.agent);
	const auth = useXcode((s) => s.auth);
	const model = useXcode((s) => s.model);
	const mode = useXcode((s) => s.permissionMode);
	const session = useActiveSession();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "px-3 pb-2.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-chip flex h-8 items-center gap-3 overflow-hidden rounded-full px-3 font-mono text-micro text-subtle",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-ok",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-ok" }), agent ? `hidden pid ${agent.pid}` : "no agent"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: auth ? "oauth · no api key" : "signed out"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden truncate md:inline",
					children: session?.cwd
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-auto truncate",
					children: [
						model,
						" · ",
						mode === "always" ? "always-approve" : "ask"
					]
				})
			]
		})
	});
}
function inlineFormat(text) {
	return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
		if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-xs bg-surface-3 px-1 py-0.5 font-mono text-xs text-fg",
			children: part.slice(1, -1)
		}, i);
		if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium text-fg",
			children: part.slice(2, -2)
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: part }, i);
	});
}
function Markdown({ text, className }) {
	const chunks = text.split(/```(\w*)\n([\s\S]*?)```/g);
	const nodes = [];
	for (let i = 0; i < chunks.length; i += 3) {
		const prose = chunks[i] ?? "";
		const lang = chunks[i + 1];
		const code = chunks[i + 2];
		if (prose) {
			const paras = prose.split(/\n{2,}/);
			for (const [pi, para] of paras.entries()) {
				const lines = para.split("\n");
				if (lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l) || l.trim() === "") && lines.some((l) => l.trim())) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "my-2 space-y-1 pl-4 text-sm leading-relaxed text-fg",
					children: lines.filter((l) => l.trim()).map((l, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "list-disc",
						children: inlineFormat(l.replace(/^\s*([-*]|\d+\.)\s+/, ""))
					}, li))
				}, `p-${i}-${pi}`));
				else if (para.trim()) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "my-2 text-sm leading-relaxed text-fg",
					children: inlineFormat(para)
				}, `p-${i}-${pi}`));
			}
		}
		if (code !== void 0) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "my-3 overflow-x-auto rounded-sm border border-border bg-desktop p-3 font-mono text-xs leading-relaxed text-fg",
			"data-lang": lang || void 0,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code.replace(/\n$/, "") })
		}, `c-${i}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("min-w-0", className),
		children: nodes
	});
}
var STARTERS = [
	"Explain this project like I just cloned it.",
	"How does OAuth in the Grok CLI work?",
	"Draft a CREATE_NO_WINDOW spawn for grok agent stdio."
];
function Transcript({ onStarter }) {
	const session = useActiveSession();
	const streaming = useXcode((s) => s.streaming);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [session?.messages, streaming]);
	const messages = session?.messages ?? [];
	const last = messages[messages.length - 1];
	const showThinking = streaming && last?.role === "assistant" && last.blocks.length === 0;
	if (messages.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-medium tracking-tight",
				children: "Ready when you are"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-center text-sm text-muted",
				children: "Hidden ACP session on grok-4.5. Ask anything — coding first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid w-full max-w-lg gap-2",
				children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					className: "h-auto justify-start rounded-xl py-3 text-left font-normal whitespace-normal",
					onClick: () => onStarter(s),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "mt-0.5 shrink-0 text-subtle" }), s]
				}, s))
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-0 flex-1 overflow-y-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "mx-auto flex max-w-3xl flex-col gap-5 px-4 py-6",
			children: [
				messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageRow, { message: m }) }, m.id)),
				showThinking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "xcode-shimmer font-medium",
						children: "Grok is thinking"
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
			]
		})
	});
}
function MessageRow({ message }) {
	if (message.role === "user") {
		const text = message.blocks.find((b) => b.type === "text");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-chip max-w-xl rounded-xl rounded-br-sm px-3.5 py-2 text-sm leading-relaxed text-fg",
				children: text && text.type === "text" ? text.text : ""
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 font-mono text-micro tracking-wider text-subtle uppercase",
			children: "Grok"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: message.blocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block: b }, i))
		})]
	});
}
function BlockView({ block }) {
	if (block.type === "thought") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "glass-well rounded-lg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
			className: "cursor-pointer text-xs text-muted",
			children: "Thinking"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-subtle",
			children: block.text
		})]
	});
	if (block.type === "tool") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("glass-chip flex items-start gap-2 rounded-lg px-3 py-2 text-xs"),
		children: [block.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mt-0.5 size-3.5 animate-spin text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "mt-0.5 size-3.5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-fg",
			children: block.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: block.detail
		})] })]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: block.text });
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		skipDelayDuration: 80,
		children
	});
}
function Tooltip({ content, children, side = "bottom" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root3, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		asChild: true,
		children
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		side,
		sideOffset: 6,
		className: cn("glass-panel z-50 rounded-full px-2.5 py-1 text-xs text-fg"),
		children: content
	}) })] });
}
function XcodeMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		"aria-hidden": "true",
		className: cn("size-7 text-fg", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "10",
				className: "fill-lift"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "0.7",
				y: "0.7",
				width: "30.6",
				height: "30.6",
				rx: "9.3",
				className: "fill-none stroke-border-strong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 9.5 23 22.5M23 9.5 9 22.5",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.1",
				strokeLinecap: "round"
			})
		]
	});
}
function WindowFrame({ children, title = "x-code", subtitle }) {
	const rootRef = (0, import_react.useRef)(null);
	function onMove(e) {
		const el = rootRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width * 100;
		const y = (e.clientY - r.top) / r.height * 100;
		el.style.setProperty("--lx", `${x}%`);
		el.style.setProperty("--ly", `${y}%`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: rootRef,
		onMouseMove: onMove,
		className: "desktop-glass flex h-dvh flex-col p-0 md:p-6 lg:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "desktop-orbs",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "desktop-grain",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("glass-window relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden", "md:rounded-window"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "glass-bar flex h-12 shrink-0 items-center select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center gap-2.5 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XcodeMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium tracking-tight",
								children: title
							}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-mono text-micro text-subtle",
								children: subtitle
							}) : null]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden h-full items-center gap-0.5 pr-1.5 sm:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionBtn, {
								label: "Minimize",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionBtn, {
								label: "Maximize",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptionBtn, {
								label: "Close",
								danger: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative z-10 flex min-h-0 flex-1 flex-col",
					children
				})]
			})
		]
	});
}
function CaptionBtn({ children, label, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		className: "flex size-11 items-center justify-center text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-8 items-center justify-center rounded-full transition-[background-color,color] duration-150", danger ? "hover:bg-danger hover:text-fg" : "hover:bg-lift hover:text-fg"),
			children
		})
	});
}
async function streamChat(input, handlers, signal) {
	const res = await fetch("/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
		signal
	});
	if (!res.ok) {
		let message = `Request failed (${res.status})`;
		try {
			const body = await res.json();
			if (body.error) message = body.error;
		} catch {}
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
			let payload;
			try {
				payload = JSON.parse(data);
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
function flattenMessageText(blocks) {
	return blocks.filter((b) => b.type === "text" && b.text).map((b) => b.text ?? "").join("\n");
}
function AppShell() {
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
	const [mobileNav, setMobileNav] = (0, import_react.useState)(false);
	const [permOpen, setPermOpen] = (0, import_react.useState)(false);
	const pendingPrompt = (0, import_react.useRef)(null);
	const abortRef = (0, import_react.useRef)(null);
	async function send(text) {
		if (permissionMode === "ask" && !folderGranted) {
			pendingPrompt.current = text;
			setPermOpen(true);
			return;
		}
		await runTurn(text);
	}
	async function runTurn(text) {
		const { sessionId } = appendUser(text);
		const snap = useXcode.getState().sessions.find((s) => s.id === sessionId);
		const history = snap?.messages.filter((m) => m.blocks.some((b) => b.type === "text")).map((m) => ({
			role: m.role,
			content: flattenMessageText(m.blocks)
		})).filter((m) => m.content.trim()).slice(-12) ?? [];
		const assistantId = startAssistant(sessionId);
		setStreaming(true);
		abortRef.current?.abort();
		const ac = new AbortController();
		abortRef.current = ac;
		try {
			await streamChat({
				messages: history,
				cwd: snap?.cwd,
				permissionMode: useXcode.getState().permissionMode
			}, {
				onText: (full) => patchAssistant(sessionId, assistantId, { text: full }),
				onThought: (full) => patchAssistant(sessionId, assistantId, { thought: full })
			}, ac.signal);
		} catch (err) {
			if (err.name === "AbortError") return;
			failAssistant(sessionId, assistantId, err instanceof Error ? err.message : "The agent did not respond.");
		} finally {
			setStreaming(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WindowFrame, {
		subtitle: agent ? `grok agent stdio · hidden pid ${agent.pid}` : "grok agent stdio · not running",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 gap-2 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: `hidden w-60 shrink-0 md:flex ${sidebarOpen ? "" : "md:hidden"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-panel flex h-full min-h-0 w-full flex-col overflow-hidden rounded-lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-12 shrink-0 items-center gap-2 px-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									className: "md:hidden",
									"aria-label": "Sessions",
									onClick: () => setMobileNav(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									className: "hidden md:inline-flex",
									"aria-label": "Toggle sessions",
									onClick: () => setSidebarOpen(!sidebarOpen),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { className: "size-4 shrink-0 text-subtle" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: session?.cwd ?? "",
									onChange: (e) => setCwd(e.target.value),
									"aria-label": "Working directory",
									spellCheck: false,
									className: "h-9 border-0 bg-transparent px-1 font-mono text-xs shadow-none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: "Settings",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon-sm",
										"aria-label": "Settings",
										onClick: () => setSettingsOpen(true),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transcript, { onStarter: send }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
							disabled: streaming,
							onSend: send
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionDialog, {
				open: permOpen,
				onOpenChange: setPermOpen,
				onAllow: () => {
					const t = pendingPrompt.current;
					pendingPrompt.current = null;
					if (t) runTurn(t);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileNav,
				onOpenChange: setMobileNav,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					title: "Sessions",
					side: "left",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
				})
			})
		]
	}) });
}
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-2xs tracking-wide", {
			muted: "text-muted glass-chip",
			ok: "text-ok bg-ok/15",
			warn: "text-warn bg-warn/15",
			accent: "text-accent-fg bg-accent"
		}[tone], className),
		children
	});
}
var STEPS = [
	{
		id: "welcome",
		label: "Welcome"
	},
	{
		id: "cli",
		label: "Grok CLI"
	},
	{
		id: "oauth",
		label: "OAuth"
	},
	{
		id: "agent",
		label: "Hidden agent"
	}
];
function Card({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass-panel rounded-lg p-5 sm:p-6",
		children
	});
}
function SetupFlow() {
	const phase = useXcode((s) => s.setupPhase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowFrame, {
		subtitle: "first run · no API key",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8 sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mb-8 flex w-full max-w-lg gap-2",
				children: STEPS.map((s, i) => {
					const done = STEPS.findIndex((x) => x.id === phase) > i || phase === "ready";
					const current = s.id === phase;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex min-w-0 flex-1 flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1 rounded-full", done || current ? "bg-accent" : "bg-lift") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("truncate font-mono text-micro uppercase tracking-wider", current ? "text-fg" : "text-subtle"),
							children: s.label
						})]
					}, s.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-lg xcode-enter",
				children: [
					phase === "welcome" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, {}),
					phase === "cli" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CliStep, {}),
					phase === "oauth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OAuthStep, {}),
					phase === "agent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentStep, {})
				]
			})]
		})
	});
}
function Welcome() {
	const next = useXcode((s) => s.setSetupPhase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XcodeMark, { className: "mb-4 size-11" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-medium tracking-tight",
			children: "x-code"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "A Windows frontend for the official Grok CLI. Sign in with your xAI account. No API key. The agent runs hidden — no console window."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-5 space-y-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }),
					title: "OAuth, not keys",
					children: "Browser PKCE against auth.x.ai. Tokens live in ~/.grok/auth.json."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }),
					title: "No console",
					children: "grok agent stdio is spawned with CREATE_NO_WINDOW and piped ACP."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fact, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, { className: "size-4" }),
					title: "The CLI stays the brain",
					children: "Sessions, tools, and models stay in the official grok binary."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-6 w-full",
			onClick: () => next("cli"),
			children: "Continue"
		})
	] });
}
function Fact({ icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "glass-chip mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full text-muted",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-medium text-fg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children
		})] })]
	});
}
function CliStep() {
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const [found, setFound] = (0, import_react.useState)(false);
	const next = useXcode((s) => s.setSetupPhase);
	function scan() {
		setScanning(true);
		window.setTimeout(() => {
			setScanning(false);
			setFound(true);
		}, 1100);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-medium tracking-tight",
			children: "Locate Grok CLI"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: [
				"x-code talks to the official ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-fg",
					children: "grok"
				}),
				" binary. It will not open a terminal to do that."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-well mt-5 rounded-md p-3 font-mono text-xs text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "PATH" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "%USERPROFILE%\\.grok\\bin" }),
				found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-2 text-ok",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }),
						" ",
						DEFAULT_BINARY
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-subtle",
					children: "not scanned"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "sm:flex-1",
				onClick: scan,
				disabled: scanning || found,
				children: [scanning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderSearch, {}), scanning ? "Scanning" : found ? "Found" : "Scan for grok.exe"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "sm:flex-1",
				disabled: !found,
				onClick: () => next("oauth"),
				children: "Continue"
			})]
		})
	] });
}
function OAuthStep() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(null);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-medium tracking-tight",
				children: "Sign in with xAI"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "OAuth 2.0 PKCE" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: "Use your SuperGrok or X Premium+ account. x-code never asks for an API key and never stores one. The official CLI owns the client and refresh cycle."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-well mt-5 rounded-md p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-micro uppercase tracking-wider text-subtle",
					children: "accounts.x.ai"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-fg",
					children: "x-code wants to use Grok on this machine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-1 font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "redirect · loopback PKCE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "scope · grok-cli" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "secret · none (public client)" })
					]
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-2 text-sm text-fg",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-ok" }), status]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "sm:flex-1",
				onClick: start,
				disabled: busy || signed,
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}), busy ? "Waiting for callback" : signed ? "Signed in" : "Continue with xAI"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "sm:flex-1",
				variant: "outline",
				disabled: !signed,
				onClick: () => next("agent"),
				children: "Continue"
			})]
		})
	] });
}
function AgentStep() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)([]);
	const spawn = useXcode((s) => s.spawnAgent);
	function run() {
		setBusy(true);
		const lines = [
			"CreateProcess · dwCreationFlags = 0x08000000",
			"stdin / stdout / stderr → pipes",
			"grok agent stdio --no-auto-update",
			"ACP initialize · authenticate cached_token",
			"Window: none"
		];
		lines.forEach((line, i) => {
			window.setTimeout(() => setLog((l) => [...l, line]), 280 * (i + 1));
		});
		window.setTimeout(() => {
			spawn();
		}, 280 * (lines.length + 1) + 200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-medium tracking-tight",
			children: "Start hidden agent"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "One long-lived process. No cmd.exe, no PowerShell window, no ConPTY. If a console flashes, that is a bug."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass-well mt-5 min-h-32 rounded-md p-3 font-mono text-xs leading-relaxed text-muted",
			children: [log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-subtle",
				children: "ready to spawn"
			}) : null, log.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-fg",
				children: l
			}, l))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			className: "mt-4 w-full",
			onClick: run,
			disabled: busy,
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}), busy ? "Spawning" : "Spawn grok agent stdio"]
		})
	] });
}
function Home() {
	if (useXcode((s) => s.setupPhase) !== "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupFlow, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };
