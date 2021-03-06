import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NodesService } from './nodes.service';

describe('NodesService', () => {
  let service: NodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientModule ]});
    service = TestBed.inject(NodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
