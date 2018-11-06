import { Component, OnInit } from '@angular/core';
import { Model } from '../DTOModels/model';
import { ModelService } from '../services/model.service';
import { AuthorizationService } from '../services/authorization.service';
import { UserFavoriteModelService } from '../services/user.favorite.model.service';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  modelId: number = 0;
  model: Model;
  isFavorite: Boolean = false;
  isAuthorized: Boolean = false;

  constructor(private modelService: ModelService,
    private userFavoriteModelService: UserFavoriteModelService,
    private authService: AuthorizationService,
    private route: ActivatedRoute) { };

  ngOnInit() {
    this.isAuthorized = (this.authService.getToken() !== null);
    this.modelId = Number.parseInt(this.route.snapshot.paramMap.get('modelId'));
    this.getModel(this.modelId);
    if (this.isAuthorized) {
      this.IsFavoriteUserModel(this.modelId);
    }
  };

  getModel(modelId): any {
    this.modelService.getModel(modelId)
      .subscribe(response => {
        this.model = new Model
          (
          response.ModelId,
          response.ModelName,
          response.AddInfo,
          response.PhotoURL,
          response.TypeName,
          response.CarTypeName,
          null,
          response.BrandName,
          response.Photos
          )
      });
  };

  IsFavoriteUserModel(modelId): any {
    this.userFavoriteModelService.checkExistFavoriteUserModel(modelId)
      .subscribe(response => {
        this.isFavorite = response;
      });
  };

  deleteFavoriteModel(modelId) {
    this.userFavoriteModelService.DeleteFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.isFavorite = false;
        }
      });
  };

  setFavoriteModel(modelId) {
    this.userFavoriteModelService.SetFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.isFavorite = true;
        }
      });
  };
}
