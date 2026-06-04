import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display title when provided', () => {
    component.title = 'Test Project';
    fixture.detectChanges();                    
    const titleEl = fixture.nativeElement.querySelector('.ds-card__title');
    expect(titleEl?.textContent?.trim()).toContain('Test Project');
  });

  it('should display subtitle when provided', () => {
    component.title = 'Test Project';
    component.subtitle = 'Due tomorrow';
    fixture.detectChanges();

    const subtitleEl = fixture.nativeElement.querySelector('.ds-card__subtitle');
    expect(subtitleEl).toBeTruthy();
    expect(subtitleEl?.textContent?.trim()).toContain('Due tomorrow');
  });

  it('should apply raised elevation by default', () => {
    fixture.detectChanges();
    const cardEl = fixture.nativeElement.querySelector('.ds-card');
    expect(cardEl.classList.contains('ds-card--raised')).toBe(true);
  });

  it('should apply clickable class when clickable is true', () => {
    component.clickable = true;
    fixture.detectChanges();                   
    const cardEl = fixture.nativeElement.querySelector('.ds-card');
    expect(cardEl.classList.contains('ds-card--clickable')).toBe(true);
  });
});