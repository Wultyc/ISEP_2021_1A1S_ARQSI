import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TripulantService, TripulantServicePost } from '../models/tripulantServices';

@Injectable({
  providedIn: 'root'
})
export class TripulantServiceService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiEndpointBackendVDM + 'tripulantService';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getTripulantServices(): Observable<TripulantService[]> {
    return this.httpClient.get<TripulantService[]>(this.url);
  }
  postTripulantService(vehicleService: TripulantServicePost): Observable<TripulantService> {
    return this.httpClient.post<TripulantService>(this.url, vehicleService).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
}
