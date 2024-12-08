'use client';

import { motion, PanInfo, useAnimation, HTMLMotionProps } from 'framer-motion';
import { Task } from '@/types';
import { useState } from 'react';
import { createSwipeSound } from '../../../public/swipe-sound';
import './SwipeCard.css';

interface SwipeCardProps {
  task: Task;
  onSwipe: (direction: 'left' | 'right') => void;
  taskNumber: number;
}

export const SwipeCard = ({ task, onSwipe, taskNumber }: SwipeCardProps) => {
  const controls = useAnimation();
  const [exitX, setExitX] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleDrag = (event: any, info: PanInfo) => {
    const xOffset = info.offset.x;
    if (xOffset > 50) {
      setSwipeDirection('right');
    } else if (xOffset < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      setExitX(info.offset.x);
      
      // Play swipe sound
      try {
        await createSwipeSound();
      } catch (error) {
        console.error('Failed to play swipe sound:', error);
      }
      
      onSwipe(direction);
    } else {
      controls.start({ x: 0 });
      setSwipeDirection(null);
    }
  };

  return (
    <motion.div
      {...{
        drag: "x",
        dragConstraints: { left: 0, right: 0 },
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        animate: controls,
        exit: { x: exitX },
        className: `swipe-card w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative ${
          swipeDirection ? `swiping-${swipeDirection}` : ''
        }`
      } as HTMLMotionProps<'div'>}
    >
      <div className="task-number">{taskNumber}</div>
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {task.category}
        </span>
        <span className="text-yellow-500 font-bold">{task.points} pts</span>
      </div>
    </motion.div>
  );
};
