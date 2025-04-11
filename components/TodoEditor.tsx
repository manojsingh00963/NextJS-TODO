'use client';

import { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TodoEditorProps {
  content: string;
  onChange: (content: string) => void;
  isEditing: boolean;
}

export default function TodoEditor({ content, onChange, isEditing }: TodoEditorProps) {
  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const selectedContent = document.createTextNode(selection.toString());
      range.deleteContents();
      range.insertNode(selectedContent);
    }
  };

  return (
    <div className="space-y-4">
      <div className="editor-toolbar flex gap-2 p-2 border rounded-lg">
        <button onClick={() => formatText('bold')} className="p-1 hover:bg-gray-100 rounded">
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('italic')} className="p-1 hover:bg-gray-100 rounded">
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('underline')} className="p-1 hover:bg-gray-100 rounded">
          <Underline className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('insertUnorderedList')} className="p-1 hover:bg-gray-100 rounded">
          <List className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('insertOrderedList')} className="p-1 hover:bg-gray-100 rounded">
          <ListOrdered className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('justifyLeft')} className="p-1 hover:bg-gray-100 rounded">
          <AlignLeft className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('justifyCenter')} className="p-1 hover:bg-gray-100 rounded">
          <AlignCenter className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('justifyRight')} className="p-1 hover:bg-gray-100 rounded">
          <AlignRight className="h-4 w-4" />
        </button>
      </div>
      <div
        className="w-full p-2 border rounded-lg min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        contentEditable={isEditing}
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={(e) => {
          if (isEditing) {
            onChange(e.currentTarget.innerHTML);
          }
        }}
      />
    </div>
  );
} 