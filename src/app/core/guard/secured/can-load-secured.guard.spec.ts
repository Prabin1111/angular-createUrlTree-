import { TestBed } from '@angular/core/testing';

import { CanLoadSecuredGuard } from './can-load-secured.guard';

describe('CanLoadSecuredGuard', () => {
  let guard: CanLoadSecuredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadSecuredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
