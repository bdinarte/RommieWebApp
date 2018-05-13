import { TestBed, inject } from '@angular/core/testing';

import { InfoGeneralService } from './info-general.service';

describe('InfoGeneralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoGeneralService]
    });
  });

  it('should be created', inject([InfoGeneralService], (service: InfoGeneralService) => {
    expect(service).toBeTruthy();
  }));
});
