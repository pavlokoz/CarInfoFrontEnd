import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class BrandService {

  private urlForGetTopFourBrands: string = 'http://localhost:50329/api/Brand/GetTopFourBrands';
  private urlForGetBrand: string = 'http://localhost:50329/api/Brand/GetBrandById';
  private urlForGetBrands: string = 'http://localhost:50329/api/Brand/GetBrands';

  constructor(private _http: Http) { }

  public getTopFourBrands(): any
  {    
    return this._http.get(this.urlForGetTopFourBrands)
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }

  public getBrands(): any
  {  
    return this._http.get(this.urlForGetBrands)
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }

  public getBrand(brandId: number): any
  {
    let searchLine = "brandId=" + brandId.toString();

    return this._http.get(this.urlForGetBrand, {params: searchLine})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }
}
