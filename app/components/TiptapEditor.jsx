'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';

const TiptapEditor = ({ note, setNote }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Heading.configure({ levels: [1] }),
    ],
    // content: note || '<p></p>',
     content: note || '',
    onUpdate: ({ editor }) => {
      setNote(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && note !== editor.getHTML()) {
      // editor.commands.setContent(note || '<p></p>');
           editor.commands.setContent(note || '');
    }
  }, [note]);

  if (!editor) return null;

  return (
    <div className="w-[100%] mx-auto my-4">
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex gap-2 p-3 bg-gray-50 border-b flex-wrap">
          {/* Style buttons */}
          <div className="flex gap-2 mr-4">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
              title="Gras"
            >
              <span className="font-bold">B</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
              title="Italique"
            >
              <span className="italic">I</span>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('underline') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
              title="Souligné"
            >
              <span className="underline">U</span>
            </button>
          </div>

          {/* Heading buttons */}
          <div className="flex gap-2 mr-4">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
              title="Titre 1"
            >
              <span className="font-bold text-lg">H1</span>
            </button>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-200 text-blue-600' : 'text-gray-700'}`}
              title="Paragraphe"
            >
              <span className="text-sm">P</span>
            </button>
          </div>

          {/* Color buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => editor.chain().focus().setColor('red').run()}
              className="p-2 rounded hover:bg-gray-200 text-red-500"
              title="Texte rouge"
            >
              <span className="font-bold">A</span>
            </button>
            <button
              onClick={() => editor.chain().focus().setColor('blue').run()}
              className="p-2 rounded hover:bg-gray-200 text-blue-500"
              title="Texte bleu"
            >
              <span className="font-bold">A</span>
            </button>
            <button
              onClick={() => editor.chain().focus().setColor('green').run()}
              className="p-2 rounded hover:bg-gray-200 text-green-500"
              title="Texte vert"
            >
              <span className="font-bold">A</span>
            </button>
          </div>
        </div>

        {/* Editor content */}
        <div className="p-4 min-h-56 max-h-88 overflow-y-auto">
          <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
        </div>
      </div>
    </div>
  );
};

export default TiptapEditor;