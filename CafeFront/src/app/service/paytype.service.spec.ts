import { TestBed } from '@angular/core/testing';

import { PaytypeService } from './paytype.service';

describe('PaytypeService', () => {
  let service: PaytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
