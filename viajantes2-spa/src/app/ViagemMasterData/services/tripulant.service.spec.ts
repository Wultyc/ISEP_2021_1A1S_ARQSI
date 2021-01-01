import { TestBed } from '@angular/core/testing';

import { TripulantService } from './tripulant.service';

describe('TripulantService', () => {
  let service: TripulantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripulantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
