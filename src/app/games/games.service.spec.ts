import { TestBed, inject } from '@angular/core/testing';

import { GamesService } from '../services/games.service';

describe('GamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GamesService]
    });
  });

  it('should be created', inject([GamesService], (service: GamesService) => {
    expect(service).toBeTruthy();
  }));
});
