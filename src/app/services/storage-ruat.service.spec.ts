import { TestBed } from '@angular/core/testing';

import { StorageRuatService } from './storage-ruat.service';

describe('StorageRuatService', () => {
  let service: StorageRuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageRuatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
