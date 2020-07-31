import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedElementComponent } from './selected-element.component';

describe('SelectedElementComponent', () => {
  let component: SelectedElementComponent;
  let fixture: ComponentFixture<SelectedElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
