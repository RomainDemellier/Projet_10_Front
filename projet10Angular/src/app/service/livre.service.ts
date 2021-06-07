import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../interface/livre';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = apiUrl + '/api/livre';

  constructor(private http: HttpClient) { }

  public getLivresDisponibles(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl);
  }

  public createLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl + '/create', livre);
  }

  public editNbreExemplaires(livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(this.apiUrl + '/editNbreExemplaires', livre);
  }

  public getDateRetourPlusProche(id: number): Observable<Date> {
    return this.http.get<Date>(this.apiUrl + '/dateRetourPlusProche/' + id);
  }

  public isLivreReservable(id: number): Observable<boolean> {
    return  this.http.get<boolean>(this.apiUrl + '/isReservable/' + id);
  }
}
