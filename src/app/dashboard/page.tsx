'use client';

import { useState, useEffect } from 'react';
import { Task, TaskCategory } from '@/types';
import tasksData from '@/data/tasks.json';

interface CategoryStats {
  total: number;
  completed: number;
  points: number;
}

interface UserStats {
  totalTasks: number;
  completedTasks: number;
  totalPoints: number;
  categoriesStats: Record<TaskCategory, CategoryStats>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats>({
    totalTasks: 0,
    completedTasks: 0,
    totalPoints: 0,
    categoriesStats: {
      'Creatività': { total: 0, completed: 0, points: 0 },
      'Relazioni': { total: 0, completed: 0, points: 0 },
      'Avventura': { total: 0, completed: 0, points: 0 },
      'Natura': { total: 0, completed: 0, points: 0 },
      'Health': { total: 0, completed: 0, points: 0 },
      'Personal Development': { total: 0, completed: 0, points: 0 },
    },
  });

  const [tasks] = useState<Task[]>(() => {
    return tasksData.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      category: task.category as TaskCategory,
    }));
  });

  useEffect(() => {
    // In a real app, this would come from an API/database
    const newStats = tasks.reduce((acc, task) => {
      const category = task.category as TaskCategory;
      
      // Update category stats
      acc.categoriesStats[category].total += 1;
      if (task.completed) {
        acc.categoriesStats[category].completed += 1;
        acc.categoriesStats[category].points += task.points;
      }
      
      // Update total stats
      acc.totalTasks += 1;
      if (task.completed) {
        acc.completedTasks += 1;
        acc.totalPoints += task.points;
      }
      
      return acc;
    }, {
      totalTasks: 0,
      completedTasks: 0,
      totalPoints: 0,
      categoriesStats: {
        'Creatività': { total: 0, completed: 0, points: 0 },
        'Relazioni': { total: 0, completed: 0, points: 0 },
        'Avventura': { total: 0, completed: 0, points: 0 },
        'Natura': { total: 0, completed: 0, points: 0 },
        'Health': { total: 0, completed: 0, points: 0 },
        'Personal Development': { total: 0, completed: 0, points: 0 },
      },
    } as UserStats);

    setStats(newStats);
  }, [tasks]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-24 pb-20">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Your Progress</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalPoints}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.completedTasks}/{stats.totalTasks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Categories Progress</h2>
          <div className="space-y-4">
            {Object.entries(stats.categoriesStats).map(([category, categoryStats]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category}</span>
                  <span className="text-sm text-gray-600">
                    {categoryStats.completed}/{categoryStats.total} tasks
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${categoryStats.total > 0 
                        ? (categoryStats.completed / categoryStats.total) * 100 
                        : 0}%`
                    }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {categoryStats.points} points earned
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
