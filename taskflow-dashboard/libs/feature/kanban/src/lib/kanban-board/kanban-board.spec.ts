import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardComponent } from './kanban-board';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 columns', () => {
    expect(component.columnKeys.length).toBe(4);
  });

  it('should have tasks in todo column', () => {
    expect(component.columns['todo'].length).toBeGreaterThan(0);
  });

  it('should have correct column titles', () => {
    expect(component.columnTitles['todo']).toBe('To Do');
    expect(component.columnTitles['inProgress']).toBe('In Progress');
  });
});