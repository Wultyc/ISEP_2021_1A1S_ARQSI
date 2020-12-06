import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RoutesService } from './routes.service';

describe('RoutesService', () => {
  let service: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(RoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
