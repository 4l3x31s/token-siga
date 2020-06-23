import { TestBed } from '@angular/core/testing';

import { DecriptService } from './decript.service';

describe('DecriptService', () => {
  let service: DecriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
