export type TaskCategory = 'Creatività' | 'Relazioni' | 'Avventura' | 'Natura' | 'Health' | 'Personal Development';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  points: number;
  completed: boolean;
  createdAt: Date;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
