import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from '@taskflow-dashboard/design-system';
import { DsButtonComponent } from '@taskflow-dashboard/design-system';
import { ModalComponent } from '@taskflow-dashboard/design-system';
import { BadgeComponent } from '@taskflow-dashboard/design-system';
import { AvatarComponent } from '@taskflow-dashboard/design-system';
import { TaskService, Task } from '../task';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DragDropModule, 
    CardComponent, 
    DsButtonComponent, 
    BadgeComponent,
    AvatarComponent,
    ModalComponent
  ],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss'
})
export class KanbanBoardComponent {
  private taskService = inject(TaskService);

  isModalOpen = false;
  newTaskTitle = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'medium';

  columnKeys = ['todo', 'inProgress', 'review', 'done'] as const;

  columnTitles: Record<string, string> = {
    todo: 'To Do',
    inProgress: 'In Progress',
    review: 'Review',
    done: 'Done'
  };

  getColumnData(key: string): Task[] {
    return this.taskService.getTasksByStatus(key as any);
  }

  openNewTaskModal() {
    this.isModalOpen = true;
    this.newTaskTitle = '';
    this.newTaskPriority = 'medium';
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveNewTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask({
        title: this.newTaskTitle.trim(),
        priority: this.newTaskPriority,
        status: 'todo'
      });
      this.closeModal();
    }
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: Task['status']) {
    if (event.previousContainer !== event.container) {
      const taskId = (event.item.data as Task).id;
      this.taskService.moveTask(taskId, newStatus);
    }
  }
}