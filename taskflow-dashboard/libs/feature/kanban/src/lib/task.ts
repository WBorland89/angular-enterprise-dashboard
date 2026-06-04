import { Injectable, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'review' | 'done';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([
    { 
      id: 1, 
      title: 'Implement login page', 
      priority: 'high' as const, 
      assignee: 'Wesley', 
      status: 'todo' 
    },
    { 
      id: 2, 
      title: 'Setup dark mode toggle', 
      priority: 'medium' as const, 
      status: 'todo' 
    },
    { 
      id: 3, 
      title: 'Create design system components', 
      priority: 'high' as const, 
      assignee: 'Wesley', 
      status: 'inProgress' 
    },
    { 
      id: 4, 
      title: 'Setup Nx workspace', 
      priority: 'low' as const, 
      status: 'done' 
    },
  ]);

  readonly tasks$ = this.tasks.asReadonly();

  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  moveTask(taskId: number, newStatus: Task['status']) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...this.tasks().map(t => t.id)) + 1
    };
    this.tasks.update(tasks => [...tasks, newTask]);
  }
}
