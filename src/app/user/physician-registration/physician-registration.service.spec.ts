import { TestBed } from '@angular/core/testing';

import { PhysicianRegistrationService } from './physician-registration.service';

describe('PhysicianRegistrationService', () => {
  let service: PhysicianRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicianRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
