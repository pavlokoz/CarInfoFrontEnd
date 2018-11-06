import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ProfileService {

  private urlForGetUserInfo: string = 'http://localhost:50329/api/Account/UserInfo';

  constructor(private _http: Http,
              private _authService: AuthorizationService) { }

  public getUserInfo(): any
  {
    var headers= new Headers();
    headers.append('Authorization', 'Bearer ' + this._authService.getToken());

    return this._http.get(this.urlForGetUserInfo, {headers: headers})
    .map((res: Response) => 
    {
      return res.json();
    })
    .catch((error: any) => Observable.throw(error));
  }
}
