import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

class FakeRouter {}

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: Router,
        useClass: FakeRouter
      }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
