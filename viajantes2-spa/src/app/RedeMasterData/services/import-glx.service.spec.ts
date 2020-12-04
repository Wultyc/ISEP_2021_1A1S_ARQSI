import { TestBed } from '@angular/core/testing';

import { ImportGLXService } from './import-glx.service';

describe('ImportGLXService', () => {
  let service: ImportGLXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportGLXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
