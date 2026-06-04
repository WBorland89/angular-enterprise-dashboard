import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show image when src is provided', () => {
    component.src = 'https://i.pravatar.cc/150';
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('pravatar');
  });

  it('should show initials when no image and name is provided', () => {
    component.name = 'John Doe';
    fixture.detectChanges();
    const fallback = fixture.nativeElement.querySelector('.ds-avatar__fallback');
    expect(fallback).toBeTruthy();
    expect(fallback.textContent?.trim()).toBe('JD');   
  });

  it('should apply correct size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.ds-avatar');
    expect(avatar.classList).toContain('ds-avatar--large');
  });
});