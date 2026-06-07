import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from './api';

export interface Task {
  id: number | string;
  title: string;
  description?: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'review' | 'done';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private api = inject(ApiService);

  private tasks = signal<Task[]>([]);

  readonly tasks$ = this.tasks.asReadonly();

  constructor() {
    this.loadTasks();
  }

  private async loadTasks() {
    try {
      const tasks = await this.api.getTasks().toPromise();
      this.tasks.set(tasks || []);
    } catch (error) {
      console.warn('Backend not available, using mock data');
      this.tasks.set([
        { id: 1, title: 'Implement login page', priority: 'high', assignee: 'Wesley', status: 'todo' },
        { id: 2, title: 'Setup dark mode', priority: 'medium', status: 'todo' },
        { id: 3, title: 'Create design system', priority: 'high', assignee: 'Wesley', status: 'inProgress' },
      ]);
    }
  }

  getTasksByStatus(status: Task['status']): Task[] {
    return this.tasks().filter(task => task.status === status);
  }

  async addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    try {
      const newTask = await this.api.createTask(task).toPromise();
      this.tasks.update(tasks => [...tasks, newTask!]);
    } catch (error) {
      console.error('Failed to create task', error);
    }
  }

  moveTask(taskId: number | string, newStatus: Task['status']) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Need to implement PUT backend endpoint call later;
  }
}
