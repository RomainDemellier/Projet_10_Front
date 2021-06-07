import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from '../interface/emprunt';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private apiUrl: string = apiUrl + '/api';

  constructor(
    private http: HttpClient
  ) { }


  public createEmprunt(emprunt: Emprunt): Observable<Emprunt>{
    return this.http.post<Emprunt>(this.apiUrl + '/emprunt/create', emprunt);
  }

  public getAllEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.apiUrl + '/emprunt');
  }
  
  public getEmpruntsUsagerConnecte(): Observable<Emprunt[]> {
      return this.http.get<Emprunt[]>(this.apiUrl + '/usager/emprunts');
    }

  public getEmpruntById(id: number): Observable<Emprunt> {
    return this.http.get<Emprunt>(this.apiUrl + '/emprunt/' + id);
  }

  public prolonger(id: number): Observable<Emprunt>{
    return this.http.put<any>(this.apiUrl + '/emprunt/prolonger/' + id, null);
  }

  public rendre(id: number): Observable<Emprunt>{
    return this.http.delete<Emprunt>(this.apiUrl + '/emprunt/delete/' + id);
  }
}
