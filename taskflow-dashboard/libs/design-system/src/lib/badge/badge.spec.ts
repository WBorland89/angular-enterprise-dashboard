import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply primary variant by default', () => {
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.ds-badge');
    expect(badge.classList).toContain('ds-badge--primary');
  });

  it('should apply correct variant class', () => {
    component.variant = 'success';
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.ds-badge');
    expect(badge.classList).toContain('ds-badge--success');
  });

  it('should apply small size when specified', () => {
    component.size = 'small';
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.ds-badge');
    expect(badge.classList).toContain('ds-badge--small');
  });
});