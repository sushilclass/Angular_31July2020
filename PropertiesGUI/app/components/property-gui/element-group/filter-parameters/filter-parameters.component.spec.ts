import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterParametersComponent } from './filter-parameters.component';

describe('FilterParametersComponent', () => {
  let component: FilterParametersComponent;
  let fixture: ComponentFixture<FilterParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
