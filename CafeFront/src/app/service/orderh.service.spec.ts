import { TestBed } from '@angular/core/testing';

import { OrderhService } from './orderh.service';

describe('OrderhService', () => {
  let service: OrderhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
