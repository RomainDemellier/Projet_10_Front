import { Injectable, OnInit } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private token: string;

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.token = this.authorizationService.getToken();
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });

    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });

    return next.handle(req);
  }
}
