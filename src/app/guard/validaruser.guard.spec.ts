import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validaruserGuard } from './validaruser.guard';

describe('validaruserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validaruserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
