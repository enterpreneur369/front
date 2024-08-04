import { TestBed } from '@angular/core/testing';

import { SignService } from './services/sign.service';

describe('SignService', () => {
  let service: SignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
