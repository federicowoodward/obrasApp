import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConstructionWorkers } from './construction-workers';

describe('Workers', () => {
  let component: ConstructionWorkers;
  let fixture: ComponentFixture<ConstructionWorkers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionWorkers],
    }).compileComponents();

    fixture = TestBed.createComponent(ConstructionWorkers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
