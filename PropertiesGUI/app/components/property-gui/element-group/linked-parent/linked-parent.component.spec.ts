import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedParentComponent } from './linked-parent.component';

describe('LinkedParentComponent', () => {
  let component: LinkedParentComponent;
  let fixture: ComponentFixture<LinkedParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
