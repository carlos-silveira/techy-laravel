import { n as useLanguage } from "./ThemeToggle-z5uN9EoT.mjs";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { Database, Loader2, MessageSquare, Send, Sparkles, StopCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
//#region resources/js/Components/RagCopilot.jsx
function RagCopilot() {
	const { __ } = useLanguage();
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([{
		role: "assistant",
		text: __("Hello! I am the Techy AI Copilot. Ask me anything about the tech topics covered in our articles."),
		isStreaming: false
	}]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);
	const abortControllerRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		scrollToBottom();
	}, [messages, isOpen]);
	const handleSend = async () => {
		if (!input.trim() || isLoading) return;
		const userMsg = input.trim();
		setInput("");
		setMessages((prev) => [...prev, {
			role: "user",
			text: userMsg
		}]);
		setIsLoading(true);
		setMessages((prev) => [...prev, {
			role: "assistant",
			text: "",
			isStreaming: true
		}]);
		try {
			abortControllerRef.current = new AbortController();
			const response = await fetch("/api/rag-chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "text/plain, text/event-stream"
				},
				body: JSON.stringify({
					query: userMsg,
					locale: document.documentElement.lang || "es"
				}),
				signal: abortControllerRef.current.signal
			});
			if (!response.ok) {
				const errText = await response.text().catch(() => "");
				throw new Error(`HTTP ${response.status}: ${errText.slice(0, 200)}`);
			}
			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let accumulatedText = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				const chunk = decoder.decode(value);
				accumulatedText += chunk;
				setMessages((prev) => {
					const newMsgs = [...prev];
					newMsgs[newMsgs.length - 1].text = accumulatedText;
					return newMsgs;
				});
			}
		} catch (error) {
			if (error.name !== "AbortError") {
				console.error("RAG error:", error);
				setMessages((prev) => {
					const newMsgs = [...prev];
					newMsgs[newMsgs.length - 1].text = "Sorry, I couldn't reach the knowledge engine. Please try again.";
					newMsgs[newMsgs.length - 1].isStreaming = false;
					return newMsgs;
				});
			}
		} finally {
			setIsLoading(false);
			setMessages((prev) => {
				const newMsgs = [...prev];
				newMsgs[newMsgs.length - 1].isStreaming = false;
				return newMsgs;
			});
			abortControllerRef.current = null;
		}
	};
	const handleStop = () => {
		if (abortControllerRef.current) abortControllerRef.current.abort();
	};
	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			onClick: () => setIsOpen(false),
			className: "fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[105] sm:hidden"
		}) }),
		/* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				y: 20,
				scale: .95
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 20,
				scale: .95
			},
			transition: { duration: .2 },
			className: "fixed bottom-[85px] sm:bottom-[90px] right-3 sm:right-6 left-3 sm:left-auto sm:w-[400px] h-[calc(100vh-100px)] sm:h-[600px] max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-120px)] flex flex-col bg-white dark:bg-[#0a0f1c] sm:bg-white/95 sm:dark:bg-[#0a0f1c]/95 sm:backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden z-[110]",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-gray-50/80 dark:bg-white/[0.02] backdrop-blur-md",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx("div", {
							className: "w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-[1px] shadow-inner shrink-0",
							children: /* @__PURE__ */ jsx("div", {
								className: "w-full h-full bg-white dark:bg-[#0a0f1c] rounded-full flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-primary" })
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "font-black text-[15px] text-gray-900 dark:text-white flex items-center gap-2 truncate",
								children: ["Techy RAG", /* @__PURE__ */ jsx("span", {
									className: "shrink-0 px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary uppercase tracking-wider font-black border border-primary/20",
									children: "Beta"
								})]
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1 font-semibold mt-0.5 truncate",
								children: [
									/* @__PURE__ */ jsx(Database, { className: "w-3 h-3 shrink-0" }),
									" ",
									__("Chat with our data")
								]
							})]
						})]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						className: "p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5 bg-transparent shrink-0",
						children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10",
					children: [messages.map((msg, idx) => /* @__PURE__ */ jsx("div", {
						className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 w-full`,
						children: /* @__PURE__ */ jsx("div", {
							className: `max-w-[90%] sm:max-w-[85%] rounded-[20px] sm:rounded-[24px] p-3 sm:p-4 text-[14px] sm:text-[15px] flex flex-col shadow-sm ${msg.role === "user" ? "bg-gradient-to-br from-primary to-purple-600 text-white rounded-br-sm" : "bg-[#f3f4f6] dark:bg-[#111827] text-gray-800 dark:text-gray-200 rounded-bl-sm border border-black/5 dark:border-white/5"}`,
							children: msg.role === "assistant" ? /* @__PURE__ */ jsx("div", {
								className: "prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-a:text-primary max-w-full break-words",
								children: msg.text === "" && msg.isStreaming ? /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium py-1",
									children: [/* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin text-primary" }), /* @__PURE__ */ jsx("span", {
										className: "text-[13px]",
										children: __("Thinking...")
									})]
								}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ReactMarkdown, {
									remarkPlugins: [remarkGfm],
									components: {
										table: ({ node, ...props }) => /* @__PURE__ */ jsx("div", {
											className: "overflow-x-auto w-full my-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0f1c]",
											children: /* @__PURE__ */ jsx("table", {
												className: "w-full text-left border-collapse text-sm whitespace-nowrap sm:whitespace-normal",
												...props
											})
										}),
										th: ({ node, ...props }) => /* @__PURE__ */ jsx("th", {
											className: "p-2 sm:p-3 bg-gray-50/50 dark:bg-white/[0.02] border-b border-black/10 dark:border-white/10 font-bold",
											...props
										}),
										td: ({ node, ...props }) => /* @__PURE__ */ jsx("td", {
											className: "p-2 sm:p-3 border-b border-black/5 dark:border-white/5 last:border-0",
											...props
										}),
										a: ({ node, ...props }) => /* @__PURE__ */ jsx("a", {
											className: "text-primary hover:underline font-medium",
											...props
										}),
										p: ({ node, ...props }) => /* @__PURE__ */ jsx("p", {
											className: "mb-2 last:mb-0",
											...props
										})
									},
									children: msg.text
								}), msg.isStreaming && /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-4 ml-1 bg-primary/60 animate-pulse align-middle rounded-full" })] })
							}) : /* @__PURE__ */ jsx("span", {
								className: "whitespace-pre-wrap leading-relaxed font-medium",
								children: msg.text
							})
						})
					}, idx)), /* @__PURE__ */ jsx("div", { ref: messagesEndRef })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "p-3 sm:p-4 bg-white dark:bg-[#0a0f1c] border-t border-black/5 dark:border-white/5 shrink-0",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center bg-gray-100 dark:bg-[#1a2030] rounded-full p-1.5 border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all",
						children: [/* @__PURE__ */ jsx("textarea", {
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: handleKeyPress,
							placeholder: __("Ask about our database context..."),
							className: "flex-1 bg-transparent text-gray-900 dark:text-white text-[14px] sm:text-[15px] py-2 px-3 sm:px-4 resize-none border-none focus:ring-0 placeholder:text-gray-500 overflow-hidden",
							rows: "1",
							style: {
								minHeight: "40px",
								maxHeight: "120px"
							}
						}), /* @__PURE__ */ jsx("div", {
							className: "flex-shrink-0 pr-1",
							children: isLoading ? /* @__PURE__ */ jsx("button", {
								onClick: handleStop,
								className: "p-1.5 sm:p-2 text-white bg-red-500 hover:bg-red-600 transition-all rounded-full shadow-sm",
								children: /* @__PURE__ */ jsx(StopCircle, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							}) : /* @__PURE__ */ jsx("button", {
								onClick: handleSend,
								disabled: !input.trim(),
								className: "p-1.5 sm:p-2 text-white bg-primary hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:text-gray-500 transition-all rounded-full shadow-sm",
								children: /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 sm:w-5 sm:h-5" })
							})
						})]
					})
				})
			]
		}) }),
		/* @__PURE__ */ jsxs(motion.button, {
			whileHover: { scale: 1.05 },
			whileTap: { scale: .95 },
			onClick: () => setIsOpen(!isOpen),
			className: "fixed bottom-6 right-3 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-primary/40 z-[110]",
			children: [isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6 sm:w-7 sm:h-7" }) : /* @__PURE__ */ jsx(MessageSquare, { className: "w-6 h-6 sm:w-7 sm:h-7" }), !isOpen && /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 border-2 border-white dark:border-[#02040a] rounded-full animate-pulse blur-[0.5px]" })]
		})
	] });
}
//#endregion
export { RagCopilot as t };
