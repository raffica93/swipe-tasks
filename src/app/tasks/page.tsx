'use client';

import { SwipeCard } from '@/components/tasks/SwipeCard';
import { Task, TaskCategory } from '@/types';
import { useState } from 'react';
import tasksData from '@/data/tasks.json';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks and their completion status from localStorage
    const savedTasks = localStorage.getItem('tasks');
    const completedTaskIds = new Set(JSON.parse(localStorage.getItem('completedTasks') || '[]'));
    
    return tasksData.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      category: task.category as TaskCategory,
      completed: completedTaskIds.has(task.id)
    }));
  });

  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'All'>('All');

  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'All' || task.category === selectedCategory
  );

  const handleSwipe = (taskId: string, direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Mark task as completed
      setTasks((currentTasks) => {
        const updatedTasks = currentTasks.map(task => 
          task.id === taskId ? { ...task, completed: true } : task
        );
        
        // Save completed task IDs to localStorage
        const completedTaskIds = updatedTasks
          .filter(task => task.completed)
          .map(task => task.id);
        localStorage.setItem('completedTasks', JSON.stringify(completedTaskIds));
        
        return updatedTasks;
      });
      console.log('Task completed:', taskId);
    }
    
    // Remove the task from view
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-24 pb-20">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      
      {/* Category Filter */}
      <div className="w-full max-w-md mb-6 overflow-x-auto">
        <div className="flex space-x-2 p-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {Object.keys(tasksData.tasks.reduce((acc, task) => {
            acc[task.category] = true;
            return acc;
          }, {} as Record<string, boolean>)).map((category, index, categories) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as TaskCategory)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md space-y-4">
        {filteredTasks.map((task, index) => (
          <SwipeCard
            key={task.id}
            task={task}
            taskNumber={index + 1}
            onSwipe={(direction) => handleSwipe(task.id, direction)}
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No more tasks! Great job! 🎉
          </p>
        )}
      </div>
    </main>
  );
}
