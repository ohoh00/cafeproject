import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegshopComponent } from './regshop.component';

describe('RegshopComponent', () => {
  let component: RegshopComponent;
  let fixture: ComponentFixture<RegshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
