'use client';

import { SwipeCard } from '@/components/tasks/SwipeCard';
import { Task } from '@/types';
import { useState } from 'react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setTasks([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {tasks.length > 0 ? (
        <SwipeCard
          task={tasks[0]}
          onSwipe={(direction) => handleSwipe(direction)}
          taskNumber={tasks.length}
        />
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No more tasks!</h2>
          <p>All tasks have been completed or saved.</p>
        </div>
      )}
    </div>
  );
}
