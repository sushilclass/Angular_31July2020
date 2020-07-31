import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeButtonComponent } from './edit-type-button.component';

describe('EditTypeButtonComponent', () => {
  let component: EditTypeButtonComponent;
  let fixture: ComponentFixture<EditTypeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
