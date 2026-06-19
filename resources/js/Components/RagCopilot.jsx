import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, StopCircle, RefreshCw, Loader2, Sparkles, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useLanguage from '@/Hooks/useLanguage';

export default function RagCopilot() {
    const { __ } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: __('Hello! I am the Techy AI Copilot. Ask me anything about the tech topics covered in our articles.'), isStreaming: false }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const abortControllerRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        // Add empty assistant message to start streaming into
        setMessages(prev => [...prev, { role: 'assistant', text: '', isStreaming: true }]);

        try {
            abortControllerRef.current = new AbortController();
            
            const response = await fetch('/api/rag-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain, text/event-stream'
                },
                body: JSON.stringify({ query: userMsg }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                const errText = await response.text().catch(() => '');
                throw new Error(`HTTP ${response.status}: ${errText.slice(0, 200)}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedText += chunk;

                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].text = accumulatedText;
                    return newMsgs;
                });
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('RAG error:', error);
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].text = "Sorry, I couldn't reach the knowledge engine. Please try again.";
                    newMsgs[newMsgs.length - 1].isStreaming = false;
                    return newMsgs;
                });
            }
        } finally {
            setIsLoading(false);
            setMessages(prev => {
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
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Overlay for mobile to close when clicking outside */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[90] sm:hidden" 
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 fixed sm:relative bottom-[70px] sm:bottom-auto right-4 left-4 sm:right-auto sm:left-auto sm:w-[420px] h-[calc(100vh-120px)] sm:h-[650px] sm:max-h-[85vh] flex flex-col bg-white/95 dark:bg-[#0a0f1c]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-[100]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center p-[1px] shadow-inner">
                                        <div className="w-full h-full bg-white dark:bg-[#0a0f1c] rounded-full flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-2">
                                            Techy RAG 
                                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary uppercase tracking-wider font-black border border-primary/20">Beta</span>
                                        </h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1 font-semibold mt-0.5">
                                            <Database className="w-3 h-3" /> Chat with our data
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-xl hover:bg-black/5 dark:hover:bg-white/5 bg-transparent">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                                        <div className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-sm flex flex-col shadow-sm ${
                                            msg.role === 'user' 
                                                ? 'bg-gradient-to-br from-primary to-purple-600 text-white rounded-br-sm' 
                                                : 'bg-white/80 dark:bg-white/[0.04] backdrop-blur-md text-gray-800 dark:text-gray-200 rounded-bl-sm border border-black/5 dark:border-white/10'
                                        }`}>
                                            {msg.role === 'assistant' ? (
                                                <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-a:text-primary max-w-none break-words prose-td:border prose-td:border-gray-200 dark:prose-td:border-white/10 prose-td:p-2 prose-th:border prose-th:border-gray-200 dark:prose-th:border-white/10 prose-th:p-2 prose-th:bg-gray-50 dark:prose-th:bg-white/5 prose-table:rounded-lg prose-table:overflow-hidden">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                                    {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-primary/60 animate-pulse align-middle rounded-full"></span>}
                                                </div>
                                            ) : (
                                                <span className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-3 sm:p-4 bg-white/50 dark:bg-[#0a0f1c]/50 backdrop-blur-xl border-t border-black/5 dark:border-white/5 relative">
                                <div className="relative flex items-end gap-2 bg-gray-50 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-2xl p-1.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder={__("Ask about our database context...")}
                                        className="flex-1 bg-transparent text-gray-900 dark:text-white text-sm py-2.5 pl-3 resize-none border-none focus:ring-0 placeholder:text-gray-400"
                                        rows="1"
                                        style={{ minHeight: '44px', maxHeight: '120px' }}
                                    />
                                    <div className="flex-shrink-0 pb-1 pr-1">
                                        {isLoading ? (
                                            <button onClick={handleStop} className="p-2 text-red-500 hover:text-white hover:bg-red-500 transition-all rounded-xl shadow-sm">
                                                <StopCircle className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={handleSend}
                                                disabled={!input.trim()}
                                                className="p-2 text-white bg-primary hover:bg-purple-600 disabled:bg-gray-200 dark:disabled:bg-white/10 disabled:text-gray-400 transition-all rounded-xl shadow-sm"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-primary via-blue-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-primary/40 relative z-[100]"
                >
                    {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />}
                    {!isOpen && (
                        <span className="absolute 0 top-0 right-0 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-red-500 border-2 border-white dark:border-[#02040a] rounded-full animate-pulse blur-[0.5px]"></span>
                    )}
                </motion.button>
            </div>
        </>
    );
}
