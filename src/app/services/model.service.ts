import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class ModelService {

  private urlForGetTopBrandModels: string = 'http://localhost:50329/api/Model/GetTopBrandModels';
  private urlForGetBrandModels: string = 'http://localhost:50329/api/Model/GetModels';
  private urlForGetModel: string = 'http://localhost:50329/api/Model/GetModelById';

  constructor(private _http: Http) { }

  public getTopBrandModels(brandId: number): any
  {
    let searchLine = "brandId=" + brandId.toString();

    return this._http.get(this.urlForGetTopBrandModels,  {params: searchLine})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }

  public getBrandModels(brandId: number): any
  {
    let searchLine = "brandId=" + brandId.toString();

    return this._http.get(this.urlForGetBrandModels,  {params: searchLine})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }

  public getModel(modelId: number): any
  {
    let searchLine = "modelId=" + modelId.toString();

    return this._http.get(this.urlForGetModel, {params: searchLine})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }
}
