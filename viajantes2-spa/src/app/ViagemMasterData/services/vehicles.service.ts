import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendVDM + 'vehicle';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.url);
  }
  postVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.httpClient.post<Vehicle>(this.url, vehicle).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
}
