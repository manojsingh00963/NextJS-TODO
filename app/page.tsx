import TodoList from '@/components/TodoList';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">TODO</h1>
        </div>
      </header>
      
      <main>
        <TodoList />
      </main>
      <Toaster />
    </div>
  );
}