import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TripulantTypeService } from './tripulant-type.service';

describe('TripulantTypeService', () => {
  let service: TripulantTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(TripulantTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
