'use client';

import { Navigation } from '@/components/ui/Navigation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">SwipeTasks</h1>
        <p className="text-gray-600 mb-8">Swipe your way through your personal development journey</p>
        <a 
          href="/tasks" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Swiping
        </a>
      </div>
    </main>
  );
}
