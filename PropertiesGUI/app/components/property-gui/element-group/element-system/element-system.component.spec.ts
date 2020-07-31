import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSystemComponent } from './element-system.component';

describe('ElementSystemComponent', () => {
  let component: ElementSystemComponent;
  let fixture: ComponentFixture<ElementSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
