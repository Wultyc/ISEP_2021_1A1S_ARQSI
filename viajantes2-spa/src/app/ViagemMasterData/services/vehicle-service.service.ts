import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { VehicleService, VehicleServicePost } from '../models/vehicleServices';

@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(private httpClient: HttpClient) { }

  url = environment.apiEndpointBackendVDM + 'vehicleService';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  postVehicle(vehicleService: VehicleServicePost): Observable<VehicleService> {
    return this.httpClient.post<VehicleService>(this.url, vehicleService).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
}
