import { TestBed } from '@angular/core/testing';

import { FacebookAuthService } from './facebook-auth.service';

describe('FacebookAuthService', () => {
  let service: FacebookAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
