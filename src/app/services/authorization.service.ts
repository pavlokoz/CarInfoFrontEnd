import { Observable } from "rxjs/Observable";
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthorizationService {
  private urlForAuthorization: string =  'http://localhost:50329/Token';
  private urlForRegistration: string = 'http://localhost:50329/api/Account/Register';

  public token: string;

  constructor(private _http: Http) {
      this.token = this.getToken();
  }

  public authorize(email: string, password: string): Observable<any> {
      var headers = new Headers();
      var content = "grant_type=password&username=" + email + "&password=" + password;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this.urlForAuthorization, content, { headers: headers })
          .map((res: Response) => {
              let token = res.json().access_token;
              if (token) {
                  this.token = token;
                  var dateNow = Date.now();
                  let tokenExpired = res.json().expires_in;
                  var tokenDurating = dateNow + tokenExpired * 1000; 
                  localStorage.setItem("user", btoa(JSON.stringify({ tokenDurating : tokenDurating , token: token })));
                  return true;
              }
              return false;
          })
          .catch((error: any) =>
                Observable.throw(error)
            );
  }

  public register(email: string, password: string, firstName: string, lastName: string,
      confirmPassword: string): Observable<any> {
      var headers = new Headers();
      var content = "Email=" + email + "&Password=" + password + "&ConfirmPassword=" + confirmPassword
          + "&FirstName=" + firstName + "&LastName=" + lastName;
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this.urlForRegistration, content, { headers: headers })
          .map((res: Response) => {
              return this.authorize(email, password);
          })
          .catch((error: any) => Observable.throw(error));
  }

 public getToken(): string {
     if (localStorage.getItem("user")){
         let user = JSON.parse(atob(localStorage.getItem("user")));
         return user ? user.token : null;
     } else {
         return null;
     }
  }

  logout(): void {
      this.token = null;
      localStorage.removeItem("user");
  }
}
