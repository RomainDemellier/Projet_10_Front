import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private token: string = '';

  constructor() { }

  public initializeToken(data: any){
    this.token = data.token;
    console.log("Dans intializeToken token : " + this.token);
  }

  public getToken(): string {
    return this.token;
  }

  public resetToken(): void {
    this.token = '';
  }
}
