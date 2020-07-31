import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGUIComponent } from './property-gui.component';

describe('CustomerListComponent', () => {
  let component: PropertyGUIComponent;
  let fixture: ComponentFixture<PropertyGUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyGUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
