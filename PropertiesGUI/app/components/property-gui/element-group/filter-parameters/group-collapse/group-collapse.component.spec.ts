import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCollapseComponent } from './group-collapse.component';

describe('GroupCollapseComponent', () => {
  let component: GroupCollapseComponent;
  let fixture: ComponentFixture<GroupCollapseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCollapseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
