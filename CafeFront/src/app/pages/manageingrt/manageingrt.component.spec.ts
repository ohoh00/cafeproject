import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageingrtComponent } from './manageingrt.component';

describe('ManageingrtComponent', () => {
  let component: ManageingrtComponent;
  let fixture: ComponentFixture<ManageingrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageingrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageingrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
