import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Usager } from '../interface/usager';
import { UsagerRegistration } from '../interface/usager-registration';
import { environment, apiUrl } from 'src/environments/environment';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  private apiUrl = apiUrl + '/api/usager';

  constructor(
    private http: HttpClient,
    private authorizeService: AuthorizationService
  ) { }

  public createUsager(usager: UsagerRegistration): Observable<any> {
    return this.http.post<UsagerRegistration>(this.apiUrl + '/create',usager);
  }

  public createAdmin(admin: UsagerRegistration): Observable<any> {
    return this.http.post<UsagerRegistration>(this.apiUrl + '/createAdmin',admin);
  }

  public getById(id: number): Observable<Usager>{
    return this.http.get<Usager>(this.apiUrl + '/' + id);
  }

  public getUsagerConnecte(): Observable<Usager> {
    return this.http.get<Usager>(this.apiUrl + '/connecte');
  }

  public getAllUsagers(): Observable<Usager[]>{
    return this.http.get<Usager[]>(this.apiUrl);
  }

  public editRole(usager: Usager): Observable<Usager>{
    return this.http.put<Usager>(this.apiUrl + '/update/role', usager);
  }

  public editProfil(usager: Usager): Observable<Usager> {
    return this.http.put<Usager>(this.apiUrl + '/update/profil', usager);
  }
}
