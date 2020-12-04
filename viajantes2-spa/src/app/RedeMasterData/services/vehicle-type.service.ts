import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {VehicleType} from '../models/vehicle-type';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { VehicleTypeComponent } from '../components/vehicle-type/vehicle-type.component';
@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/api/vehicle-types';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getVehicleTypes(): Observable<VehicleType[]> {
    return this.httpClient.get<VehicleType[]>(this.url);    
  }
  postVehicleType(vehicleType: VehicleType): Observable<VehicleType> {
    return this.httpClient.post<VehicleType>(this.url, vehicleType)
      // .pipe(
      //   catchError(this.handleError(error: any))
      // );
       .pipe(
        catchError((err) => {
          // console.error('Erro')
          // console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      )
  }
}
