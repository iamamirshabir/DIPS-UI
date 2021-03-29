import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianDialogComponent } from './physician-dialog.component';

describe('PhysicianDialogComponent', () => {
  let component: PhysicianDialogComponent;
  let fixture: ComponentFixture<PhysicianDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
