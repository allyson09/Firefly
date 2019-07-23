import { TestBed, inject } from '@angular/core/testing';

import { FireflyService } from './firefly.service';

describe('FireflyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireflyService]
    });
  });

  it('should be created', inject([FireflyService], (service: FireflyService) => {
    expect(service).toBeTruthy();
  }));
});
