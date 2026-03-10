import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';

const MenuBar = ({ editor }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    if (!editor) {
        return null;
    }

    const handleAskLlama = async () => {
        const { state } = editor;
        const { from, to } = state.selection;

        let promptText = state.doc.textBetween(from, to, ' ');
        if (!promptText) {
            alert('Please highlight some text or a topic to ask Llama about.');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await axios.post('/api/ask-llama', { prompt: promptText });
            const generatedHtml = `<p><em><strong>Llama Says:</strong> ${response.data.response}</em></p>`;

            editor.chain().focus().insertContentAt(to, generatedHtml).run();
        } catch (error) {
            console.error('Error asking Llama', error);
            alert('Failed to connect to the AI service.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-[#0a0f1c] rounded-lg border border-gray-800">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('bold') ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('italic') ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('strike') ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                Strike
            </button>
            <div className="w-px bg-gray-700 my-1 mx-2"></div>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${editor.isActive('bulletList') ? 'bg-primary text-[#0a0f1c]' : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
            >
                Bullet List
            </button>
            <div className="flex-grow"></div>
            <button
                onClick={handleAskLlama}
                disabled={isGenerating}
                className={'px-3 py-1.5 rounded text-sm font-medium transition-colors bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 flex items-center shadow-[0_0_10px_rgba(168,85,247,0.2)] disabled:opacity-50 disabled:cursor-not-allowed'}
            >
                {isGenerating ? (
                    <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                )}
                {isGenerating ? 'Asking...' : 'Ask Llama'}
            </button>
        </div>
    );
};

export default function RichEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content || '<h2>The Future of AI CMS</h2><p>Start drafting your narrative here. Highlight a topic text to use the AI assistant.</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-primary max-w-none focus:outline-none min-h-[300px]',
            },
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getJSON());
            }
        },
    }, [content]); // Added content to dependency array to re-render if draft loads

    return (
        <div className="relative">
            <MenuBar editor={editor} />
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(0,180,255,0.1)] transition-all duration-300">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
