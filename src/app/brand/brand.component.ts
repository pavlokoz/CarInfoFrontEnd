import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { ModelService } from '../services/model.service';
import { AuthorizationService } from '../services/authorization.service';
import { UserFavoriteModelService } from '../services/user.favorite.model.service';
import { Brand } from '../DTOModels/brand';
import { Model } from '../DTOModels/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {

  brand: Brand;
  brandId: number = 0;
  topModels: Model[] = [];
  userFavoriteModelIds: number[] = [];
  isAuthorized: Boolean = false;

  constructor(private brandService: BrandService,
    private modelService: ModelService,
    private userFavoriteModelService: UserFavoriteModelService,
    private authService: AuthorizationService,
    private route: ActivatedRoute) { };

  ngOnInit() {
    this.isAuthorized = (this.authService.getToken() !== null);
    this.brandId = Number.parseInt(this.route.snapshot.paramMap.get('brandId'));
    this.getBrand(this.brandId);
    this.getTopModels(this.brandId);
    if (this.isAuthorized) {
      this.getUserFavoriteModelIds();
    }
  };

  getBrand(brandId): any {
    this.brandService.getBrand(brandId)
      .subscribe(response => {
        this.brand = new Brand
          (
          response.BrandId,
          response.BrandName,
          response.Description,
          response.PhotoURL,
          response.CountryName
          )
      });
  };

  getTopModels(brandId): any {
    this.modelService.getTopBrandModels(brandId)
      .subscribe(response => {
        response.forEach(element => {
          this.topModels.push(new Model(
            element.ModelId,
            element.ModelName,
            null,
            element.PhotoURL,
            null,
            null,
            null
          ))
        });
      });
  };

  getUserFavoriteModelIds(): any {
    this.userFavoriteModelService.getFavoriteModelIds()
      .subscribe(response => {
        response.forEach(element => {
          this.userFavoriteModelIds.push(element);
        });
      });
  };

  isFavoriteModel(modelId) {
    return this.userFavoriteModelIds.includes(modelId);
  };

  deleteFavoriteModel(modelId) {
    this.userFavoriteModelService.DeleteFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.userFavoriteModelIds.splice(this.userFavoriteModelIds.indexOf(modelId), 1)
        };
      });
  };

  setFavoriteModel(modelId) {
    this.userFavoriteModelService.SetFavoriteModel(modelId).
      subscribe(response => {
        if (response) {
          this.userFavoriteModelIds.push(modelId);
        }
      })
  };
}
