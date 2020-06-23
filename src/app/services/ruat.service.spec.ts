import { TestBed } from '@angular/core/testing';

import { RuatService } from './ruat.service';

describe('RuatService', () => {
  let service: RuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
