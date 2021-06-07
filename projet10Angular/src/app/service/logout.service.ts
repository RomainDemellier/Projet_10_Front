import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private logoutUrl = 'http://localhost:8080/logout';

  

  constructor(
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) { }

  logout(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.authorizationService.getToken()
      })
    };
    return this.http.post(this.logoutUrl, httpOptions);
  }
}
