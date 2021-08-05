import { TestBed } from '@angular/core/testing';

import { CanLoadPublicGuard } from './can-load-public.guard';

describe('CanLoadPublicGuard', () => {
  let guard: CanLoadPublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoadPublicGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
