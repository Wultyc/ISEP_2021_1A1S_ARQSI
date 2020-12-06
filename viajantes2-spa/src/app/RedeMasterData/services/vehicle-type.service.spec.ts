import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { VehicleTypeService } from './vehicle-type.service';

describe('VehicleTypeService', () => {
  let service: VehicleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(VehicleTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
