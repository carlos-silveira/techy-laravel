import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Database, X, StopCircle, Send, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { u as useLanguage } from "./ThemeToggle-DHUR6cL4.mjs";
function RagCopilot() {
  const { __ } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: __("Hello! I am the Techy AI Copilot. Ask me anything about the tech topics covered in our articles."), isStreaming: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const scrollToBottom = () => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "assistant", text: "", isStreaming: true }]);
    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch("/api/rag-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain, text/event-stream"
        },
        body: JSON.stringify({ query: userMsg }),
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
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-[100] flex flex-col items-end", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
        transition: { duration: 0.2 },
        className: "mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] sm:h-[550px] max-h-[80vh] flex flex-col bg-white dark:bg-[#0d1117] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-[1px]", children: /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-white dark:bg-[#0d1117] rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-primary" }) }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2", children: [
                  "Techy RAG",
                  /* @__PURE__ */ jsx("span", { className: "px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary uppercase tracking-wider font-black", children: "Beta" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Database, { className: "w-3 h-3" }),
                  " Chat with our data"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), className: "p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5", children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10", children: [
            messages.map((msg, idx) => /* @__PURE__ */ jsx("div", { className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[85%] rounded-2xl p-3 text-sm flex flex-col ${msg.role === "user" ? "bg-primary text-white rounded-br-none" : "bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none border border-black/5 dark:border-white/5"}`, children: msg.role === "assistant" ? /* @__PURE__ */ jsxs("div", { className: "prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-a:text-primary max-w-none break-words", children: [
              /* @__PURE__ */ jsx(ReactMarkdown, { children: msg.text }),
              msg.isStreaming && /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-4 ml-1 bg-primary/60 animate-pulse align-middle" })
            ] }) : /* @__PURE__ */ jsx("span", { className: "whitespace-pre-wrap leading-relaxed", children: msg.text }) }) }, idx)),
            /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-3 bg-white dark:bg-[#0d1117] border-t border-black/5 dark:border-white/5 relative", children: [
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                onKeyDown: handleKeyPress,
                placeholder: __("Ask about our database context..."),
                className: "w-full bg-gray-50 dark:bg-white/[0.03] text-gray-900 dark:text-white text-sm rounded-xl py-3 pl-4 pr-12 resize-none border border-black/10 dark:border-white/10 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-400",
                rows: "1",
                style: { minHeight: "50px", maxHeight: "120px" }
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute right-5 bottom-5", children: isLoading ? /* @__PURE__ */ jsx("button", { onClick: handleStop, className: "p-1.5 text-red-500 hover:text-red-600 transition-colors bg-white dark:bg-[#0d1117] rounded-md shadow-sm", children: /* @__PURE__ */ jsx(StopCircle, { className: "w-5 h-5" }) }) : /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleSend,
                disabled: !input.trim(),
                className: "p-1.5 text-primary disabled:text-gray-400 hover:text-purple-600 transition-colors bg-white dark:bg-[#0d1117] rounded-md shadow-sm",
                children: /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
              }
            ) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: () => setIsOpen(!isOpen),
        className: "w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white flex items-center justify-center shadow-lg shadow-primary/30 relative",
        children: [
          isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(MessageSquare, { className: "w-6 h-6" }),
          !isOpen && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-[#02040a] rounded-full animate-pulse blur-[0.5px]" })
        ]
      }
    )
  ] });
}
export {
  RagCopilot as R
};
