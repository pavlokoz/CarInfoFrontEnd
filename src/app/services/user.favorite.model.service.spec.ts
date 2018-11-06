import { TestBed, inject } from '@angular/core/testing';
import { UserFavoriteModelService } from './user.favorite.model.service';

describe('UserFavoriteModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFavoriteModelService]
    });
  });

  it('should be created', inject([UserFavoriteModelService], (service:UserFavoriteModelService) => {
    expect(service).toBeTruthy();
  }));
});
