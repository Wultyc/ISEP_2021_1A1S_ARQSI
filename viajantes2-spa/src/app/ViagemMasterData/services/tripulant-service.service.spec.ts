import { TestBed } from '@angular/core/testing';

import { TripulantServiceService } from './tripulant-service.service';

describe('TripulantServiceService', () => {
  let service: TripulantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripulantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
