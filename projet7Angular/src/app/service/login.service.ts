import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = apiUrl + '/authenticate';
  private allReadyLogged: Boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(login: Login){
    console.log(login.username);
    return this.http.post<Login>(this.loginUrl, login);
  }

  public logged(){
    this.allReadyLogged = true;
  }

  public logout(){
    this.allReadyLogged = false;
  }

  public isAllReadyLogged(): Boolean {
    return this.allReadyLogged;
  }
}
