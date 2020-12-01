import { TestBed } from '@angular/core/testing';

import { TripulantTypeService } from './tripulant-type.service';

describe('TripulantTypeService', () => {
  let service: TripulantTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripulantTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
