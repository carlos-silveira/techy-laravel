import React, { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { 
    Bold, Italic, Strikethrough, Heading2, Heading3, 
    List, ListOrdered, Quote, Code, Undo, Redo, Sparkles, Loader2,
    ChevronDown, AlignLeft, CheckCircle, Wand2, RefreshCw, FileEdit as FileEditIcon
} from 'lucide-react';

const AIMenu = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => document.removeEventListener('mousedown', handleClickOutside, true);
    }, []);

    if (!editor) return null;

    const handleAction = async (actionId, label) => {
        setIsOpen(false);
        const { state } = editor;
        const { from, to } = state.selection;
        let selectedText = state.doc.textBetween(from, to, ' ');

        if (!selectedText) {
            alert('Please highlight some text to use the AI tools.');
            return;
        }

        setIsGenerating(true);
        setCurrentAction(label);
        try {
            const response = await axios.post('/api/editor-action', { 
                action: actionId, 
                text: selectedText 
            });
            
            const resultHtml = response.data.result;
            
            if (actionId === 'continue') {
                editor.chain().focus().insertContentAt(to, `<p>${resultHtml}</p>`).run();
            } else {
                editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, resultHtml).run();
            }
        } catch (error) {
            console.error('Error with AI Action', error);
            alert('AI action failed. Please try again.');
        } finally {
            setIsGenerating(false);
            setCurrentAction('');
        }
    };

    return (
        <div className="relative z-[100]" ref={menuRef}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-50 pointer-events-auto"
            >
                {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isGenerating ? currentAction : 'AI Tools'}
                {!isGenerating && <ChevronDown className="w-3 h-3 ml-1" />}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#0a0f1c] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-[110]">
                    <div className="p-2 border-b border-gray-800 bg-gray-900/50">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 px-2">Highlight text first</span>
                    </div>
                    <div className="flex flex-col p-1">
                        <button type="button" onClick={() => handleAction('continue', 'Writing...')} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto">
                            <AlignLeft className="w-4 h-4 text-primary" /> Auto-Complete
                        </button>
                        <button type="button" onClick={() => handleAction('summarize', 'Summarizing...')} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto">
                            <FileEditIcon className="w-4 h-4 text-purple-400" /> Summarize Section
                        </button>
                        <button type="button" onClick={() => handleAction('professional', 'Refining...')} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto">
                            <Wand2 className="w-4 h-4 text-blue-400" /> Make Professional
                        </button>
                        <button type="button" onClick={() => handleAction('fix_grammar', 'Correcting...')} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-colors text-left w-full pointer-events-auto">
                            <CheckCircle className="w-4 h-4 text-green-400" /> Fix Grammar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const MenuBar = ({ editor }) => {
    if (!editor) return null;

    const btnClass = (active) => `p-2.5 rounded-xl transition-all pointer-events-auto ${active ? 'bg-primary text-white shadow-[0_0_15px_rgba(43,124,238,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`;

    return (
        <div className="flex flex-wrap gap-2 mb-6 p-2 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-xl items-center relative z-50">
            <div className="flex gap-1 border-r border-white/10 pr-2">
                <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded-xl text-gray-500 hover:text-white disabled:opacity-30 pointer-events-auto"><Undo className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded-xl text-gray-500 hover:text-white disabled:opacity-30 pointer-events-auto"><Redo className="w-4 h-4" /></button>
            </div>

            <div className="flex gap-1 border-r border-white/10 pr-2">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}><Bold className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}><Italic className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))}><Strikethrough className="w-4 h-4" /></button>
            </div>

            <div className="flex gap-1 border-r border-white/10 pr-2">
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}><Heading2 className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))}><Heading3 className="w-4 h-4" /></button>
            </div>

            <div className="flex gap-1 border-r border-white/10 pr-2">
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}><List className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}><ListOrdered className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))}><Quote className="w-4 h-4" /></button>
                <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnClass(editor.isActive('codeBlock'))}><Code className="w-4 h-4" /></button>
            </div>

            <div className="flex-grow"></div>
            <AIMenu editor={editor} />
        </div>
    );
};

export default function RichEditor({ initialContent, onChange, keyTrigger }) {
    const editor = useEditor({
        extensions: [StarterKit],
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-primary max-w-none focus:outline-none min-h-[400px] text-lg font-light leading-relaxed relative z-10',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON());
        },
    });

    // Only update content when article ID changes or reset triggered
    useEffect(() => {
        if (editor && initialContent !== undefined) {
            let parsed;
            try {
                parsed = typeof initialContent === 'string' && initialContent.startsWith('{') ? JSON.parse(initialContent) : initialContent;
            } catch (e) {
                parsed = initialContent;
            }
            editor.commands.setContent(parsed || '');
        }
    }, [editor, keyTrigger]);

    return (
        <div className="relative w-full">
            <MenuBar editor={editor} />
            <div className="min-h-[500px] relative pointer-events-auto">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
