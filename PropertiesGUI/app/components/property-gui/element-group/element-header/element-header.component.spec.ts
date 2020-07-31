import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementHeaderComponent } from './element-header.component';

describe('ElementHeaderComponent', () => {
  let component: ElementHeaderComponent;
  let fixture: ComponentFixture<ElementHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
