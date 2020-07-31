import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedDetailElementComponent } from './linked-detail-element.component';

describe('LinkedDetailElementComponent', () => {
  let component: LinkedDetailElementComponent;
  let fixture: ComponentFixture<LinkedDetailElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedDetailElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedDetailElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
