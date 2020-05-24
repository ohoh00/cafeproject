import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncbarComponent } from './funcbar.component';

describe('FuncbarComponent', () => {
  let component: FuncbarComponent;
  let fixture: ComponentFixture<FuncbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
