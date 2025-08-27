import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingRegistry } from './missing-registry';

describe('MissingRegistry', () => {
  let component: MissingRegistry;
  let fixture: ComponentFixture<MissingRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingRegistry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
