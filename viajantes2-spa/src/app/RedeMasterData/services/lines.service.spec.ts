import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LinesService } from './lines.service';

describe('LinesService', () => {
  let service: LinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(LinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
