import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ImportGLXService } from './import-glx.service';

describe('ImportGLXService', () => {
  let service: ImportGLXService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(ImportGLXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
