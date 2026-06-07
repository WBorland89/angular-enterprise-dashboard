import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api';
import { Task } from './task';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from the backend', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Test Task', priority: 'high', status: 'todo', createdAt: new Date().toISOString() }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const newTask = { title: 'New Task', priority: 'medium' as const, status: 'todo' as const };

    service.createTask(newTask).subscribe(task => {
      expect(task.title).toBe('New Task');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tasks');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newTask, id: 99, createdAt: new Date().toISOString() });
  });
});