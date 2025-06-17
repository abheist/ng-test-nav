import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formSaveGuard } from './form-save-guard';

describe('formSaveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formSaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
