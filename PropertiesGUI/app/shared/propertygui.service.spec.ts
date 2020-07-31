import { TestBed } from '@angular/core/testing';

import { propertyguiService } from './propertygui.service';

describe('propertyguiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: propertyguiService = TestBed.get(propertyguiService);
    expect(service).toBeTruthy();
  });
});
