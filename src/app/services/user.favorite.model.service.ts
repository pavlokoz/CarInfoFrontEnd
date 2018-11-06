import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient,HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { AuthorizationService } from './authorization.service';

@Injectable()
export class UserFavoriteModelService {

  private urlForSetFavoriteModel: string = 'http://localhost:50329/api/UserFavoriteModel/SetUserFavoriteModel';
  private urlForDeleteFavoriteModel: string = 'http://localhost:50329/api/UserFavoriteModel/DeleteUserFavoriteModel';
  private urlForGetFavoriteModels: string = 'http://localhost:50329/api/UserFavoriteModel/GetUserFavoriteModels';
  private urlForGetFavoriteModelIds: string = 'http://localhost:50329/api/UserFavoriteModel/GetUsersFavoriteModelIds';
  private urlForCheckExistFavoriteUserModel: string = 'http://localhost:50329/api/UserFavoriteModel/CheckExistFavoriteUserModel';

  constructor(private _http: Http,
    private _authService: AuthorizationService) { }

  public getFavoriteModels(): any {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.getToken());

    return this._http.get(this.urlForGetFavoriteModels, { headers: headers })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  public getFavoriteModelIds(): any {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.getToken());

    return this._http.get(this.urlForGetFavoriteModelIds, { headers: headers })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  public checkExistFavoriteUserModel(modelId: number): any {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.getToken());
    let searchLine = "modelId=" + modelId.toString();
 
    return this._http.get(this.urlForCheckExistFavoriteUserModel, { headers: headers, params: searchLine })
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error));
  }

  public SetFavoriteModel(modelId: number): any
  {
      var headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this._authService.getToken());  
      let searchLine = new URLSearchParams();
      searchLine.set('modelId', modelId.toString());
      return this._http.post(this.urlForSetFavoriteModel, null,
          { headers: headers, params: searchLine})
          .map((res: Response) => {
                 return res;
              })
          .catch((error: any) => Observable.throw(error));
  }
  
  public DeleteFavoriteModel(modelId: number): any
  {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.getToken());  
    let searchLine = "modelId=" + modelId.toString();
    return this._http.delete(this.urlForDeleteFavoriteModel, 
        { headers: headers, params: searchLine})
        .map((res: Response) => {
               return res;
            })
        .catch((error: any) => Observable.throw(error));
  }
}
