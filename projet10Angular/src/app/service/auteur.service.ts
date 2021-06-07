import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auteur } from '../interface/auteur';
import { Observable } from 'rxjs';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {
  private apiUrl: string = apiUrl + '/api/auteur';

  constructor(private http: HttpClient) { }

  public createAuteur(auteur: Auteur): Observable<Auteur>{
    return this.http.post<Auteur>(this.apiUrl + '/create', auteur);
  }

  public getAllAuteurs(): Observable<Auteur[]>{
    return this.http.get<Auteur[]>(this.apiUrl);
  }

  public getAteurById(id: number): Observable<Auteur>{
    console.log(id);
    console.log(typeof id);
    return this.http.get<Auteur>(this.apiUrl + '/' + id);
  }
}
