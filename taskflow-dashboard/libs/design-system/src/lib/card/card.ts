import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() elevation: 'flat' | 'raised' | 'elevated' = 'raised';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() clickable = false;
}