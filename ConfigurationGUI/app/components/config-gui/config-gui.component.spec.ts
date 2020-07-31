import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGUIComponent } from './config-gui.component';

describe('ConfigGUIComponent', () => {
  let component: ConfigGUIComponent;
  let fixture: ComponentFixture<ConfigGUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
