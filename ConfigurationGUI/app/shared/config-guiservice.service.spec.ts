import { TestBed } from '@angular/core/testing';

import { ConfigGUIServiceService } from './config-guiservice.service';

describe('ConfigGUIServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigGUIServiceService = TestBed.get(ConfigGUIServiceService);
    expect(service).toBeTruthy();
  });
});
