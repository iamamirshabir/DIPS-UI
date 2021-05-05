import { TestBed } from '@angular/core/testing';

import { PhysicianDialogService } from './physician-dialog.service';

describe('PhysicianDialogService', () => {
  let service: PhysicianDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicianDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
