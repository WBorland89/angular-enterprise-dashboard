import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { KanbanBoardComponent } from '@taskflow-dashboard/feature-kanban';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    KanbanBoardComponent, 
    ThemeToggleComponent,
    HttpClientModule   
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}