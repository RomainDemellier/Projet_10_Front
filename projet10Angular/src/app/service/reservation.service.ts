import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, apiUrl } from 'src/environments/environment';
import { Reservation } from '../interface/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl: string = apiUrl + '/api';

  constructor(
    private http: HttpClient
  ) { }

    public createReservation(reservation: Reservation): Observable<Reservation> {
      return this.http.post<Reservation>(this.apiUrl + '/reservation/create', reservation);
    }

    public deleteReservation(id: number): Observable<Reservation> {
      return this.http.delete<Reservation>(this.apiUrl + '/reservation/delete/' + id);
    }

    public getReservationsUsagerConnecte(): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(this.apiUrl + '/usager/reservations');
    }

    public getPlaceIntoListeReservations(id: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/reservation/place/' + id);
    }
}
