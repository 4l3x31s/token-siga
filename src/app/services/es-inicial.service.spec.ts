import { TestBed } from '@angular/core/testing';

import { EsInicialService } from './es-inicial.service';

describe('EsInicialService', () => {
  let service: EsInicialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsInicialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
