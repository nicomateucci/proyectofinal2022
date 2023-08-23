import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { userLogginGuard } from './user-loggin.guard';

describe('userLogginGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userLogginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
