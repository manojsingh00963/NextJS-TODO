'use client';

import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import TodoEditor from './TodoEditor';

interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function TodoDetail() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Partial<Todo>>({});

  const updateTodo = async () => {
    if (!todo?._id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTodo),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodo(updatedTodo);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (!todo) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        Select a todo to view details
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center text-sm hover:text-primary">
          <ArrowLeft className="mr-2" size={18} />
          Back
        </button>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Edit
          </button>
        ) : (
          <button 
            onClick={updateTodo}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            <Save className="mr-2" size={18} />
            Save
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex-1">
          <TodoEditor
            content={todo.description}
            onChange={(content) => setEditedTodo({ ...editedTodo, description: content })}
            isEditing={isEditing}
          />
        </div>
      ) : (
        <div className="prose prose-sm max-w-none flex-1 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">{todo.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: todo.description }} />
        </div>
      )}
    </div>
  );
}