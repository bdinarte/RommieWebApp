import { TestBed, inject } from '@angular/core/testing';

import { ExpositoresService } from './expositores.service';

describe('ExpositoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpositoresService]
    });
  });

  it('should be created', inject([ExpositoresService], (service: ExpositoresService) => {
    expect(service).toBeTruthy();
  }));
});
