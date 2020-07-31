import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeDropdownComponent } from './edit-type-dropdown.component';

describe('EditTypeDropdownComponent', () => {
  let component: EditTypeDropdownComponent;
  let fixture: ComponentFixture<EditTypeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
