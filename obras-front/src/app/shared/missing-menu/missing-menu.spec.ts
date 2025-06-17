import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingMenu } from './missing-menu';

describe('MissingMenu', () => {
  let component: MissingMenu;
  let fixture: ComponentFixture<MissingMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
