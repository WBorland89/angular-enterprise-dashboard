import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks by status', () => {
    const todoTasks = service.getTasksByStatus('todo');
    expect(todoTasks.length).toBeGreaterThan(0);
  });

  it('should move task to new status', () => {
    const initialTodoCount = service.getTasksByStatus('todo').length;
    service.moveTask(1, 'inProgress');
    const newTodoCount = service.getTasksByStatus('todo').length;
    expect(newTodoCount).toBe(initialTodoCount - 1);
  });
});