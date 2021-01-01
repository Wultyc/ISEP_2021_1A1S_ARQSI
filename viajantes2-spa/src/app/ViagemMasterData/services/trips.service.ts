import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trip, TripPost, TripAdHocPost } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendVDM + 'trip';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(this.url);
  }
  postTrip(trip: Trip): Observable<Trip> {
    return this.httpClient.post<Trip>(this.url, trip).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
  postAdHocTrip(trip: TripAdHocPost): Observable<TripAdHocPost> {
    return this.httpClient.post<TripAdHocPost>(this.url + "/adhoc", trip).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
}
