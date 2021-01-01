import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tripulant, TripulantPost } from '../models/tripulant';

@Injectable({
  providedIn: 'root'
})
export class TripulantService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiEndpointBackendVDM + 'tripulant';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getTripulants(): Observable<Tripulant[]> {
    return this.httpClient.get<Tripulant[]>(this.url);    
  }
  postTripulant(tripulant: TripulantPost): Observable<Tripulant> {
    return this.httpClient.post<Tripulant>(this.url, tripulant).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    )
  }
}
