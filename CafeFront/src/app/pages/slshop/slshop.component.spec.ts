import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlshopComponent } from './slshop.component';

describe('SlshopComponent', () => {
  let component: SlshopComponent;
  let fixture: ComponentFixture<SlshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
