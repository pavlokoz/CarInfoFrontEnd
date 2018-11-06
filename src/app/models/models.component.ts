import { Component, OnInit } from '@angular/core';
import { Model } from '../DTOModels/model';
import { ModelService } from '../services/model.service';
import { AuthorizationService } from '../services/authorization.service';
import { UserFavoriteModelService } from '../services/user.favorite.model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  public models: Model[] = [];
  brandId: number = 0;
  userFavoriteModelIds: number[] = [];
  brandName: string;
  isAuthorized: Boolean = false;

  constructor(private modelService: ModelService,
    private userFavoriteModelService: UserFavoriteModelService,
    private authService: AuthorizationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isAuthorized = (this.authService.getToken() !== null);
    this.brandId = Number.parseInt(this.route.snapshot.paramMap.get('brandId'));
    this.getModels(this.brandId);
    if (this.isAuthorized) {
      this.getUserFavoriteModels();
    }
  }

  getModels(brandId: number): any {
    this.modelService.getBrandModels(brandId)
      .subscribe(response =>
        response.forEach(element => {
          this.brandName = element.BrandName;
          this.models.push(
            new Model(
              element.ModelId,
              element.ModelName,
              null,
              element.PhotoURL,
              element.TypeName,
              element.CarTypeName,
              null,
              element.BrandName
            )
          );
        })
      )
  }

  getUserFavoriteModels(): any {
    this.userFavoriteModelService.getFavoriteModelIds()
      .subscribe(response => {
        response.forEach(element => {
          this.userFavoriteModelIds.push(element);
        });
      });
  }

  isFavoriteModel(modelId) {
    return this.userFavoriteModelIds.includes(modelId);
  }

  deleteFavoriteModel(modelId) {
    this.userFavoriteModelService.DeleteFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.userFavoriteModelIds.splice(this.userFavoriteModelIds.indexOf(modelId), 1)
        };
      }
      )
  }

  setFavoriteModel(modelId) {
    this.userFavoriteModelService.SetFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.userFavoriteModelIds.push(modelId);
        }
      })
  }
}
