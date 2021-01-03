import { TestBed } from '@angular/core/testing';

import { WorkBlocksService } from './work-blocks.service';

describe('WorkBlocksService', () => {
  let service: WorkBlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkBlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
