import { TestBed } from '@angular/core/testing';

import { EncyptDecryptDataService } from './encypt-decrypt-data.service';

describe('EncyptDecryptDataService', () => {
  let service: EncyptDecryptDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncyptDecryptDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
