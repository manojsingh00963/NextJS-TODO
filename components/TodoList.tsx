'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Search, Trash2, X, Save, Edit2, ChevronLeft, ChevronRight, FilePlus2 } from 'lucide-react';
import TodoEditor from './TodoEditor';


interface Todo {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    fetchTodos();
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [page, searchQuery]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos?page=${page}&limit=10${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''
        }`
      );
      const data = await response.json();
      setTodos(data.todos);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to fetch todos');
    }
  };

  const createTodo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        setNewTodo({ title: '', description: '' });
        setIsCreating(false);
        fetchTodos();
        toast.success('Todo created successfully');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      toast.error('Failed to create todo');
    }
  };

  const updateTodo = async () => {
    if (!selectedTodo) return;

    try {
      const response = await fetch(`http://localhost:5000/api/todos/${selectedTodo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTodo),
      });

      if (response.ok) {
        setIsEditing(false);
        fetchTodos();
        toast.success('Todo updated successfully');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedTodo(null);
        fetchTodos();
        toast.success('Todo deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  };

  const renderTodoList = () => (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo._id}
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedTodo?._id === todo._id ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
          onClick={() => setSelectedTodo(todo)}
        >
          <h3 className="font-medium">{todo.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: todo.description }} />
          <p className="text-xs text-gray-500 mt-2">
            {format(new Date(todo.date), 'MMM d, yyyy')}
          </p>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );

  const renderEditor = () => {
    if (isCreating) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">New Todo</h2>
            <button
              onClick={() => setIsCreating(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <TodoEditor
            content={newTodo.description}
            onChange={(content) => setNewTodo({ ...newTodo, description: content })}
            isEditing={true}
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
              onClick={() => setIsCreating(false)}
            >
              <X size={18} />
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-black/50 flex items-center gap-2"
              onClick={createTodo}
            >
              <Save size={18} />
              Create
            </button>
          </div>
        </div>
      );
    }

    if (selectedTodo) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTodo.title}
                  onChange={(e) => setSelectedTodo({ ...selectedTodo, title: e.target.value })}
                />
              ) : (
                selectedTodo.title
              )}
            </h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={updateTodo}
                  >
                    <Save size={20} />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsEditing(false)}
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    className="p-2 hover:bg-red-100 rounded-full text-red-500"
                    onClick={() => deleteTodo(selectedTodo._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
          <TodoEditor
            content={selectedTodo.description}
            onChange={(content) => setSelectedTodo({ ...selectedTodo, description: content })}
            isEditing={isEditing}
          />
        </div>
      );
    }

    return (
      <div className="text-center text-gray-500">
        Select a todo to and edit here.
      </div>
    );
  };

  return (
    <div className=" p-10 max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
          onClick={() => setIsCreating(true)}
        >
          <FilePlus2 size={18} />
          Todo
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search todos..."
            className="w-0 px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {!isMobileView && (
          <div className="border rounded-lg p-4 overflow-auto max-h-[calc(100vh-12rem)]">
            {renderTodoList()}
          </div>
        )}

        <div className="border rounded-lg p-4">
          {isMobileView && (isCreating || selectedTodo) ? (
            <div className="space-y-4">
              <button
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsCreating(false);
                  setSelectedTodo(null);
                }}
              >
                <ChevronLeft size={18} />
                Back to List
              </button>
              {renderEditor()}
            </div>
          ) : (
            <>
              {isMobileView ? renderTodoList() : renderEditor()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}