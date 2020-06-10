import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHComponent } from './order-h.component';

describe('OrderHComponent', () => {
  let component: OrderHComponent;
  let fixture: ComponentFixture<OrderHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
