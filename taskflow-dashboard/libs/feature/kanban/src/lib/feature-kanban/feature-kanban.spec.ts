import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureKanban } from './feature-kanban';

describe('FeatureKanban', () => {
  let component: FeatureKanban;
  let fixture: ComponentFixture<FeatureKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureKanban],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
