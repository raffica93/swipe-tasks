'use client';

import { Navigation } from '@/components/ui/Navigation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navigation />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Swipe Tasks</h1>
        <p className="text-lg text-gray-600">Start managing your tasks with simple swipes!</p>
      </div>
    </main>
  );
}
