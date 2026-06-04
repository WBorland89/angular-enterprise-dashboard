import { Component } from '@angular/core';
import { KanbanBoardComponent } from '@taskflow-dashboard/feature-kanban';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanBoardComponent, ThemeToggleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'TaskFlow';
}